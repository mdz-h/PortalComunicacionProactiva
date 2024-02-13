import { AppStateInterface } from '../models/app-state.interface';
import { createSelector } from '@ngrx/store';

export const selectSecurity = (state: AppStateInterface) => state.security;

export const selectJSessionId = createSelector(selectSecurity, s1 => s1.jSessionId);
