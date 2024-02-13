import { FileLoadInterface } from './file-load.interface';
import { EntityPublicationInterface } from './entity-publication.interface';
import { DecodedExcelInterface } from './decoded-excel.interface';

export interface CredentialRegistrationViewInterface {
  decodedExcel: DecodedExcelInterface;
  fileLoad: FileLoadInterface;
  publications: EntityPublicationInterface;
}
