import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/privet-route';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {AppScreenProps} from '../../types/types-page';

function App({adsCount}: AppScreenProps): JSX.Element {
  const auth = AuthorizationStatus.Auth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout authorizationStatus={auth} />}>
          <Route
            index
            element={<MainPage adsCount={adsCount} />}
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={auth}>
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
