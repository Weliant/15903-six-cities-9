import { Outlet, useLocation } from 'react-router-dom';
import { LayoutProps } from '../../types/layout';
import Header from '../../components/header/header';
import { AppRoute } from '../../consts';
import { isCheckedAuth } from '../../utils/auth';

function Layout (props: LayoutProps): JSX.Element {
  const {authorizationStatus} = props;
  const isAuth = isCheckedAuth(authorizationStatus);
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
