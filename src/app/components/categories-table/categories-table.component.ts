import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss'
})
export class CategoriesTableComponent {
  @Input() categories: ICategory[] = [];
  @Input() areActionsAvailable = false;

  @Output() editCategory = new EventEmitter<ICategory>();
  @Output() deleteCategory = new EventEmitter<ICategory>();

  onEdit(category: ICategory) {
    this.editCategory.emit(category);
  }

  onDelete(category: ICategory) {
    this.deleteCategory.emit(category);
  }
}