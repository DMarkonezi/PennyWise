export interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';  
  color: string;
  isDefault: boolean;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  isFormOpen: boolean;
}

export const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  isFormOpen: false
};
