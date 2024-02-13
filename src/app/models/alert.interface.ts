import { AlertStateType } from './alert-state.type';

export interface AlertInterface {
  message: string;
  state: AlertStateType;
}
