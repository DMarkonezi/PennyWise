import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../store/categories.state';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css'
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    if (confirm('Are you sure you want to delete this category?')) {
      this.delete.emit(this.category.id);
    }
  }
}
