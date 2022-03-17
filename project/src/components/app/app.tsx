import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks';
import Spinner from './../spinner/spinner';
import { checkAuthAction, fetchOffersAction } from '../../store/api-action';
import { store } from '../../store';

function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  useEffect(() => {
    store.dispatch(checkAuthAction());
    store.dispatch(fetchOffersAction());
  }, [authorizationStatus]);

  if (!isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus} />}>
          <Route
            index
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Room}
            element={<OfferPage authorizationStatus={authorizationStatus} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
