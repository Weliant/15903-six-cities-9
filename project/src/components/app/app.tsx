import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { checkAuthAction } from '../../store/api-action';
import { store } from '../../store';
import HistoryRouter from '../history-router/history-router';
import { ToastContainer } from 'react-toastify';
import browserHistory from '../../services/browser-history';
import { getLoadedDataStatus } from '../../store/app-data/selectors';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  useEffect(() => {
    store.dispatch(checkAuthAction());
  }, []);

  if (!isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <ToastContainer />
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route
              index
              element={<MainPage />}
            />
            <Route
              path={AppRoute.Room}
              element={<OfferPage />}
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
      </HistoryRouter>
    </>
  );
}

export default App;
