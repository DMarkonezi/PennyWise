import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  totalIncome = 150000;
  totalExpense = 98500;
  balance = 51500;
  savings = 86723;

  budgets = [
    { category: 'Hrana', icon: '🍔', spent: 12500, limit: 15000 },
    { category: 'Transport', icon: '🚗', spent: 4800, limit: 8000 },
    { category: 'Stanarina', icon: '🏠', spent: 40000, limit: 40000 },
    { category: 'Zabava', icon: '🎮', spent: 2100, limit: 5000 }
  ];

  constructor(private router: Router) {}

  onAddBudget() {
    this.router.navigate(['/budgets']);
  }
}