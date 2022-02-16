import {RouteProps} from 'react-router-dom';
import {AuthorizationStatus} from '../consts';

export type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}
