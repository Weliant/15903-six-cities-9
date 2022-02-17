import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {PrivateRouteProps} from '../../types/types-route';

function PrivateRoute(props: PrivateRouteProps) : JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
