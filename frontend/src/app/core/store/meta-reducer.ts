import { ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { logout } from '../../features/auth/store/auth.actions';

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === logout.type) {
      state = undefined; // resetuje ceo store
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];