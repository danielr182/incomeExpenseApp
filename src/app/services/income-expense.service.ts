import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { IncomeExpense } from '../models/incomeExpense.model';
import { authSelectors } from '../store/auth/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(private firestore: AngularFirestore, private store$: Store) { }

  createIncomeExpense(incomeExpense: IncomeExpense): any {
    let uid;
    this.store$.select(authSelectors.userAuthSelector).pipe(first()).subscribe(user => uid = user?.uid);
    this.firestore.doc(`${uid}/income-expense`).collection('items').add({incomeExpense})
  }
}
