import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../models/app-state.interface';

export const selectTemplateRegistrationView = (state: AppStateInterface) => state.templateRegistrationView;

export const selectParameters = createSelector(selectTemplateRegistrationView, s1 => s1.parameters);

export const selectLoading = createSelector(selectTemplateRegistrationView, s1 => s1.loading);

export const selectClear = createSelector(selectTemplateRegistrationView, s1 => s1.clear);
