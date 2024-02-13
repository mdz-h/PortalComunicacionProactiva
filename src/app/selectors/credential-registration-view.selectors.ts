import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../models/app-state.interface';

import { publicationEntityAdapter } from '../entity-adapters/publication.entity-adapter';

const { selectAll: selectAllPublications } = publicationEntityAdapter.getSelectors();

export const selectCredentialRegistrationView = (state: AppStateInterface) => state.credentialRegistrationView;

export const selectFileLoad = createSelector(selectCredentialRegistrationView, s1 => s1.fileLoad);

export const selectFileSize = createSelector(selectFileLoad, s1 => s1.size);

export const selectLoadProgress = createSelector(selectFileLoad, s1 => s1.progress);

export const selectLoading = createSelector(selectFileLoad, s1 => s1.loading);

export const selectProgress = createSelector(selectFileLoad, s1 => s1.percent);

export const selectEntityPublications = createSelector(selectCredentialRegistrationView, s1 => s1.publications);

export const selectPublications = createSelector(selectEntityPublications, selectAllPublications);

export const selectDecodedExcel = createSelector(selectCredentialRegistrationView, s1 => s1.decodedExcel);

export const selectDecodedUrls = createSelector(selectDecodedExcel, s1 => s1.decodedUrls);

export const selectDecodedUrlsPlazas = createSelector(selectDecodedUrls, s1 => Object.keys(s1));

export const selectCredentials = createSelector(selectDecodedUrls, s1 => Object.values(s1)
  .reduce((previousValue, currentValue) =>
    [...previousValue, ...currentValue], []));

export const selectPlazasNotLoaded = createSelector(selectDecodedExcel, s1 => s1.plazasNotLoaded);

export const selectPlazasNotLoadedPlazas = createSelector(selectPlazasNotLoaded, s1 => Object.keys(s1));

export const selectUnknownCellType = createSelector(selectDecodedExcel, s1 => s1.unknownCellType);

export const selectUnknownCellTypePlazas = createSelector(selectUnknownCellType, s1 => Object.keys(s1));

export const selectStoresNotFound = createSelector(selectDecodedExcel, s1 => s1.storesNotFound);
