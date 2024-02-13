import { EntityTemplatesInterface } from './entity-templates.interface';
import { EntityPlazasInterface } from './entity-plazas.interface';

export interface CatalogInterface {
  plazas: EntityPlazasInterface;
  templates: EntityTemplatesInterface;
}
