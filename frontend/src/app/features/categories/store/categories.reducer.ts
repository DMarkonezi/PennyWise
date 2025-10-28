import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import { CategoriesState, initialState } from './categories.state';

export const categoriesReducer = createReducer(
  initialState,

  // Load
  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    categories,
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add
  on(CategoriesActions.addCategory, (state) => ({
    ...state,
    loading: true,
  })),
  on(CategoriesActions.addCategorySuccess, (state, { category }) => ({
    ...state,
    loading: false,
    categories: [...state.categories, category],
  })),
  on(CategoriesActions.addCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UI toggling
  on(CategoriesActions.openCategoryForm, (state) => ({
    ...state,
    isFormOpen: true,
  })),
  on(CategoriesActions.closeCategoryForm, (state) => ({
    ...state,
    isFormOpen: false,
  }))
);
