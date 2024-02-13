import { EntityState } from '@ngrx/entity';

import { ParameterInterface } from './parameter.interface';
import { TemplateInterface } from './template.interface';

export interface EntityTemplateInterface extends EntityState<ParameterInterface>{
  template: TemplateInterface;
  loading: boolean;
}
