import Logo from '../../components/logo/logo';
import NavUser from '../../components/nav-user/nav-user';
import { HeaderProps } from '../../types/header';

function Header(props: HeaderProps) : JSX.Element {
  const {isLoginPage, isAuth} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {!isLoginPage && <NavUser isAuth={isAuth} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
