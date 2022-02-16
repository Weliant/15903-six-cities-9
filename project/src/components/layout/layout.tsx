import {Outlet, useLocation} from 'react-router-dom';
import {LayoutProps} from '../../types/types-component';
import Header from '../../components/header/header';
import {AppRoute, AuthorizationStatus} from '../../consts';

function Layout (props: LayoutProps): JSX.Element {
  const {authorizationStatus} = props;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const location = useLocation();
  let isLoginPage = false;
  let stylePage = 'page';

  if (location.pathname === AppRoute.Login) {
    isLoginPage = true;
    stylePage = 'page page--gray page--login';
  } else if (location.pathname === AppRoute.Root) {
    stylePage = 'page page--gray page--main';
  }

  return (
    <div className={stylePage}>
      <Header isAuth={isAuth} isLoginPage={isLoginPage}/>
      <Outlet />
    </div>
  );
}

export default Layout;
