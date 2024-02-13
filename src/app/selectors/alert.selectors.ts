import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../models/app-state.interface';

export const selectAlert = (state: AppStateInterface) => state.alert;

export const selectAlertMessage = createSelector(selectAlert, s1 => s1.message);
