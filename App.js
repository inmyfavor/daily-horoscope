import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Routes from './Routes.js'

const App = () => {

  const [fontsLoaded] = useFonts({
    'NoyhSlim-Regular': require('./assets/fonts/NoyhSlim-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <Routes />
    );
  }
}

export default App;
