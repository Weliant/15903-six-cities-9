import { HeaderProps } from '../../types/types-component';

function NavUser(props: HeaderProps) : JSX.Element {
  const {isAuth} = props;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth
          ?
          <>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="/">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              </a>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#sign">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
          :
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="/">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </a>
          </li>}
      </ul>
    </nav>
  );
}

export default NavUser;
