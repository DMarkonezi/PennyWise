import { createAction, props } from '@ngrx/store';
import { Category } from './categories.state';

// Loading categories

export const loadCategories = createAction(
  '[Categories] Load Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: string }>()
);

// Add Categorsies

export const addCategory = createAction(
  '[Categories] Add Category',
  props<{ category: Omit<Category, 'id'> }>()
);

export const addCategorySuccess = createAction(
  '[Categories] Add Category Success',
  props<{ category: Category }>()
);

export const addCategoryFailure = createAction(
  '[Categories] Add Category Failure',
  props<{ error: string }>()
);

// UI actions

export const openCategoryForm = createAction('[Categories] Open Form');

export const closeCategoryForm = createAction('[Categories] Close Form');
