import { UserInterface } from './user.interface';
import { ApplicationInterface } from './application.interface';
import { MenuInterface } from './menu.interface';

export interface UserInformationInterface {
  user?: UserInterface;
  application?: ApplicationInterface;
  menus?: MenuInterface[];
}
