import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StatusBar,
  useColorScheme
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationService from './navigation/helpers/NavigationService';
import RootStackNavigator from './navigation/navigators/RootStackNavigator';


const App = () =>  {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  enableScreens()

  const routeName = NavigationService.getCurrentRoute()?.name

  const onNavigationReady = async () => {
    // TODO: hideSplashScreen()
  }
 

  return (
    <SafeAreaProvider>
      <StatusBar  translucent backgroundColor={'transparent'} />
        <NavigationContainer
            ref={NavigationService.ref}
            onReady={onNavigationReady}
          >
            <RootStackNavigator />
            {/* TODO: <AppLoading />  */}
          </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

export default App;
