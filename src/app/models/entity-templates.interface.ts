import { EntityState } from '@ngrx/entity';

import { TemplateInterface } from './template.interface';

export interface EntityTemplatesInterface extends EntityState<TemplateInterface>{
  loading: boolean;
  error?: string;
}
