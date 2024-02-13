import { SubmenuInterface } from './submenu.interface';

export interface MenuInterface {
  profileId: number;
  profileName: string;
  profileShortName: string;
  profileDescription: string;
  submenus: SubmenuInterface[];
  serviceId: number;
  serviceName: string;
  serviceShortName: string;
  serviceDescription: string;
  serviceUrl: string;
  serviceSortOrder: number;
  serviceType: string;
}
