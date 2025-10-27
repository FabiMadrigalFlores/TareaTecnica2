import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesFormComponent } from '../../components/categories-form/categories-form.component';
import { CategoriesTableComponent } from '../../components/categories-table/categories-table.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CategoryService } from '../../services/category.service';
import { ICategory, IRoleType } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoriesFormComponent,
    CategoriesTableComponent,
    PaginationComponent
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  categoryService: CategoryService = inject(CategoryService);
  private fb: FormBuilder = inject(FormBuilder);

  form!: FormGroup;
  isEdit: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.checkUserRole();
    this.categoryService.getAll();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  save(category: ICategory): void {
    if (this.form.valid) {
      if (this.isEdit) {
        this.categoryService.update(category);
      } else {
        this.categoryService.save(category);
      }
      this.resetForm();
    }
  }

  edit(category: ICategory): void {
    this.isEdit = true;
    this.form.patchValue(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  delete(category: ICategory): void {
    if (confirm(`¿Estás seguro de eliminar la categoría "${category.name}"?`)) {
      this.categoryService.delete(category);
    }
  }

  resetForm(): void {
    this.form.reset();
    this.isEdit = false;
  }

  checkUserRole(): void {
    this.isAdmin = this.authService.hasRole(IRoleType.admin) ||
                   this.authService.hasRole(IRoleType.superAdmin);
  }
}
