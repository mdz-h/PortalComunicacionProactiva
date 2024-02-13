import { UrlParameterInterface } from './url-parameter.interface';
import { TemplateInterface } from './template.interface';

export interface DecodedUrlInterface {
  urlParameters: UrlParameterInterface[];
  template: TemplateInterface;
  url: string;
  crStore: string;
  crPlaza: string;
}
