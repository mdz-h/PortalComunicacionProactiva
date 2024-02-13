import { AppStateInterface } from '../models/app-state.interface';
import { createSelector } from '@ngrx/store';

export const selectUserInformation = (state: AppStateInterface) => state.user;

export const selectUser = createSelector(selectUserInformation, s1 => s1.user);

export const selectMenus = createSelector(selectUserInformation, s1 => s1.menus);

export const selectApplication = createSelector(selectUserInformation, s1 => s1.application);
