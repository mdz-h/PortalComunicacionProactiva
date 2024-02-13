import { EntityState } from '@ngrx/entity';

import { PlazaInterface } from './plaza.interface';

export interface EntityPlazasInterface extends EntityState<PlazaInterface> {
  loading: boolean;
  error?: string;
}
