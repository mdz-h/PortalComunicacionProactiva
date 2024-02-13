import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../models/app-state.interface';

import { plazaEntityAdapter } from '../entity-adapters/plaza.entity-adapter';

import { templateEntityAdapter } from '../entity-adapters/template.entity-adapter';

const { selectAll: selectAllPlazas } = plazaEntityAdapter.getSelectors();

const { selectAll: selectAllTemplates } = templateEntityAdapter.getSelectors();

export const selectCatalogs = (state: AppStateInterface) => state.catalogs;

export const selectEntityTemplates = createSelector(selectCatalogs, s1 => s1.templates);

export const selectLoadingTemplates = createSelector(selectEntityTemplates, s1 => s1.loading);

export const selectTemplates = createSelector(selectEntityTemplates, s1 => selectAllTemplates(s1));

export const selectEntityPlazas = createSelector(selectCatalogs, s1 => s1.plazas);

export const selectLoadingPlazas = createSelector(selectEntityPlazas, s1 => s1.loading);

export const selectPlazas = createSelector(selectEntityPlazas, s1 => selectAllPlazas(s1));
