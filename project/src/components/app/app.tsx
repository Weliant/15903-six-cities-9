import MainScreen from '../main-screen/main-screen';

type AppScreenProps = {
  adsCount: number;
}

function App({adsCount}: AppScreenProps): JSX.Element {
  return (
    <MainScreen adsCount={adsCount} />
  );
}

export default App;
