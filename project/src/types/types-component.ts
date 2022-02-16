import { AuthorizationStatus } from '../consts';

export type HeaderProps = {
  isLoginPage?: boolean;
  isAuth?: boolean;
}

export type LayoutProps = {
  authorizationStatus: AuthorizationStatus
}
