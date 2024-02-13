import { ParameterInterface } from './parameter.interface';

export interface TemplateRegistrationViewInterface {
  url: string;
  parameters: ParameterInterface[];
  loading: boolean;
  clear: boolean;
}
