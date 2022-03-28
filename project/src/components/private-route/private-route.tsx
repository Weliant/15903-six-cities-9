import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { PrivateRouteProps } from '../../types/route';
import { isCheckedAuth } from '../../utils/auth';

function PrivateRoute(props: PrivateRouteProps) : JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    isCheckedAuth(authorizationStatus)
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
