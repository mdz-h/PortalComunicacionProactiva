import { CatalogInterface } from './catalog.interface';
import { TemplateViewInterface } from './template-view.interface';
import { SecurityInterface } from './security.interface';
import { CredentialRegistrationViewInterface } from './credential-registration-view.interface';
import { TemplateRegistrationViewInterface } from './template-registration-view.interface';
import { AlertInterface } from './alert.interface';
import { UserInformationInterface } from './user-information.interface';
import { RouteInterface } from './route.interface';

export interface AppStateInterface {
  credentialRegistrationView: CredentialRegistrationViewInterface;
  templateRegistrationView: TemplateRegistrationViewInterface;
  templateView: TemplateViewInterface;
  catalogs: CatalogInterface;
  security: SecurityInterface;
  alert: AlertInterface;
  user: UserInformationInterface;
  currentRoute: RouteInterface;
}
