import { Injectable } from '@angular/core';
import { from, map, Observable, Subscription, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

import { AuthUser } from '../models/authUser.model';
import { User } from '../models/user.model';
import * as authActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subs$ = new Subscription();

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private store$: Store) {}

  createUser(authUser: AuthUser): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(authUser.email, authUser.password)).pipe(
      tap(({ user }) => {
        const uid = user?.uid ?? '';
        const name = authUser?.name ?? '';
        const newUser = new User(uid, name, authUser.email);
        this.firestore.doc(`${uid}/user`).set({ ...newUser });
      })
    );
  }

  initAuthListener(): void {
    this.auth.authState.subscribe((authUser) => {
      if (authUser) {
        this.subs$ = this.firestore
          .doc<User>(`${authUser.uid}/user`)
          .valueChanges()
          .subscribe((fsUser) => {
            if (fsUser) {
              this.store$.dispatch(authActions.setUser({ user: fsUser }));
            }
          });
      } else {
        this.subs$.unsubscribe();
        this.store$.dispatch(authActions.removeUser());
      }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => Boolean(user)));
  }

  loginUser(user: AuthUser): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(user.email, user.password));
  }

  logoutUser(): Observable<any> {
    return from(this.auth.signOut());
  }
}
