import { Injectable } from '@angular/core';
import { from, map, Observable, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthUser } from '../models/authUser.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) {}

  createUser(authUser: AuthUser): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(authUser.email, authUser.password)).pipe(
      tap(({ user }) => {
        const uid = user?.uid ?? '';
        const name = authUser?.name ?? '';
        const newUser = new User(uid, name, authUser.email);
        this.firestore.doc(`${uid}/usuario`).set({ ...newUser });
      })
    );
  }

  initAuthListener(): void {
    this.auth.authState.subscribe((user) => console.log(user));
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
