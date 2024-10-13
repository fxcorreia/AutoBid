import AppLoading from '@app/screens/app/AppLoading'
import { initializeVehicles } from '@app/screens/dashboard/VehiclesSlice'
import Colors from '@app/styles/Colors'
import { CarLogo, IconFavouriteFullColored } from '@assets/svg'
import { AppDispatch } from '@data/redux/ReduxStore'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import DashboardStack from './DashboardStack'
import FavouritesStack from './FavouritesStack'

const Drawer = createDrawerNavigator()

const RootStackNavigator = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(initializeVehicles())
  }, [dispatch])

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
      </Drawer.Navigator> 
      <AppLoading />
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
})

export default RootStackNavigator
