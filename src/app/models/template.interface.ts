import { ParameterInterface } from './parameter.interface';

export interface TemplateInterface {
  templateId: number;
  name: string;
  url: string;
  status: string;
  parameters: number;
  method: string;
  port: string;
  resource: string;
  secType: string;
  contentType: string;
  alertType: string;
  authorization: string;
  user: string;
  password: string;
  createdBy: string;
  creationDate: string;
  updatedBy: string;
  updatedDate: string;
  parameterList: ParameterInterface[];
}
