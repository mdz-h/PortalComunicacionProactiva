import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../models/app-state.interface';
import { parameterEntityAdapter } from '../entity-adapters/parameter.entity-adapter';

const { selectAll} = parameterEntityAdapter.getSelectors();

export const selectTemplateView = (state: AppStateInterface) => state.templateView;

export const selectCurrentTemplate = createSelector(selectTemplateView, s1 => s1.currentTemplate);

export const selectParameters = createSelector(selectCurrentTemplate, selectAll);
