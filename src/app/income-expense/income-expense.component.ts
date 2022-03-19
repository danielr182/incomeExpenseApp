import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeExpenseType } from '../enums/incomeExpenseType.enum';
import { IncomeExpense } from '../models/incomeExpense.model';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit {
  incomeExpenseForm: FormGroup;
  incomeExpenseType = IncomeExpenseType;

  constructor(private fb: FormBuilder, private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.incomeExpenseForm = this.fb.group({
      amount: ['', Validators.required],      
      description: ['', Validators.required],      
      type: ['', Validators.required],      
    });
  }

  addIncomeExpense(): void {
    console.log(this.incomeExpenseForm.value);
    const incomeExpense = this.incomeExpenseForm.value as IncomeExpense;
    this.incomeExpenseService.createIncomeExpense(incomeExpense);
  }
}
