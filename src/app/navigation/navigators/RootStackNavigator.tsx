import Colors from '@app/styles/Colors'
import { CarLogo, IconFavouriteFullColored } from '@assets/svg'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet } from 'react-native'
import DashboardStack from './DashboardStack'
import FavouritesStack from './FavouritesStack'

const Drawer = createDrawerNavigator();

const RootStackNavigator = () => {
  return (
    <>
       <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: styles.drawerStyle,
          drawerItemStyle: styles.drawerItemStyle,
          drawerActiveTintColor: Colors.primary,
        }}
      >
        <Drawer.Screen
          name={"DashboardStack"}
          component={DashboardStack}
          options={{
            drawerIcon: () => <CarLogo height={24} width={24}/>,
          }}
        />
        <Drawer.Screen
          name={"FavouriteStack"}
          component={FavouritesStack}
          options={{
            drawerIcon: () => <IconFavouriteFullColored />,
          }}
        />
        {/* <Drawer.Screen
          name={"Update PIN code"}
          component={SettingsStack}
          options={{
            drawerIcon: () => <IconGear height={20} width={20} />,
          }}
        /> */}
      </Drawer.Navigator> 
      {/* TODO: <AppLoading /> */}
    </>
  )
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: Colors.white,
    paddingTop: 77,
  },
  drawerItemStyle: {
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default RootStackNavigator
