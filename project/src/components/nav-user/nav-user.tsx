import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getUser } from '../../store/user-process/selectors';
import { HeaderProps } from '../../types/header';

function NavUser(props: HeaderProps) : JSX.Element {
  const {isAuth} = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const handleSignInClick = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth
          ?
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                {user?.avatarUrl?
                  <div className="header__avatar-wrapper">
                    <img src={user.avatarUrl} alt="Avatar" />
                  </div>
                  : <div className="header__avatar-wrapper user__avatar-wrapper"></div>}
                <span className="header__user-name user__name">{user?.email}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" onClick={handleSignInClick} to={AppRoute.Login}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
          :
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
}

export default NavUser;
