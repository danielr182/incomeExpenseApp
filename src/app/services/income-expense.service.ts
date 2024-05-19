import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { first, from, map, Observable } from 'rxjs';
import { IncomeExpense } from '../models/incomeExpense.model';
import { authSelectors } from '../store/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  constructor(private firestore: AngularFirestore, private store$: Store) {}

  createIncomeExpense(incomeExpense: IncomeExpense): Observable<any> {
    let uid;
    this.store$
      .select(authSelectors.userAuthSelector)
      .pipe(first())
      .subscribe((user) => (uid = user?.uid));
    return from(
      this.firestore
        .doc(`${uid}/income-expense`)
        .collection('items')
        .add({ ...incomeExpense })
    );
  }

  deleteIncomeExpense(uid: string = ''): Observable<void> {
    let authUid;
    this.store$
      .select(authSelectors.userAuthSelector)
      .pipe(first())
      .subscribe((user) => (authUid = user?.uid));
    return from(
      this.firestore
        .doc(`${authUid}/income-expense/items/${uid}`)
        .delete()
    );
  }

  getItems(): Observable<IncomeExpense[]> {
    let uid;
    this.store$
      .select(authSelectors.userAuthSelector)
      .pipe(first())
      .subscribe((user) => (uid = user?.uid));
    return this.firestore
      .collection<IncomeExpense>(`${uid}/income-expense/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data(),
          }))
        )
      );
  }
}
