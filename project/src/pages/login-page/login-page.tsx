import { FormEvent, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, CITIES } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { Auth } from '../../types/auth';
import { isCheckedAuth } from '../../utils/auth';
import { getRandomInteger } from '../../utils/common';

function LoginPage() : JSX.Element {
  const indexCity = getRandomInteger(0, CITIES.length-1);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {authorizationStatus} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus)) {
    return <Navigate to={AppRoute.Root} />;
  }

  const onSubmit = (authData: Auth) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      navigate(AppRoute.Root);
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={`${AppRoute.Root}#${CITIES[indexCity].toLowerCase()}`}>
              <span>{CITIES[indexCity]}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
