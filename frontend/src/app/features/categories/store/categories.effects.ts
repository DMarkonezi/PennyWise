import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../services/category.service';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  // constructor(private actions$: Actions, private categoryService: CategoryService) {}

  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError((error) =>
            of(CategoriesActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.addCategory),
      mergeMap(({ category }) =>
        this.categoryService.addCategory(category).pipe(
          map((created) => CategoriesActions.addCategorySuccess({ category: created })),
          catchError((error) =>
            of(CategoriesActions.addCategoryFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
