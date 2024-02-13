import { DecodedUrlInterface } from './decoded-url.interface';
import { ErrorResponseInterface } from './error-response.interface';
import { CellAddressInterface } from './cell-address.interface';
import { StoreInformationInterface } from './store-information.interface';

export interface DecodedExcelInterface {
  decodedUrls: DecodedInterface<DecodedUrlInterface[]>;
  plazasNotLoaded: DecodedInterface<ErrorResponseInterface>;
  unknownCellType: DecodedInterface<CellAddressInterface[]>;
  storesNotFound: DecodedInterface<StoreInformationInterface[]>;
}

export interface DecodedInterface<T> {
  [key: string]: T;
}
