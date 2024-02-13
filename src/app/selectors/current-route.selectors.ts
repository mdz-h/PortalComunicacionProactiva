import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../models/app-state.interface';

export const selectCurrentRoute = (appState: AppStateInterface) => appState.currentRoute;

export const selectCurrentRouteName = createSelector(selectCurrentRoute, s1 => s1.name);
