import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StatusBar,
  useColorScheme
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import NavigationService from './navigation/helpers/NavigationService';
import RootStackNavigator from './navigation/navigators/RootStackNavigator';
import Colors from './styles/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () =>  {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  enableScreens()

  const routeName = NavigationService.getCurrentRoute()?.name

  const onNavigationReady = async () => {
    // TODO: hideSplashScreen()
  }
 

  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor={'transparent'} />
        <NavigationContainer
            ref={NavigationService.ref}
            onReady={onNavigationReady}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>

              <RootStackNavigator />
            {/* TODO: <AppLoading />  */}
            </GestureHandlerRootView>
          </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

export default App;
