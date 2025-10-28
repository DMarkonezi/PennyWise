// transaction-list.ts (CHILD KOMPONENTA - tabela)

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../store/transactions.state';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.css',
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() deleteTransaction = new EventEmitter<number>();

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.deleteTransaction.emit(id);
    }
  }
}