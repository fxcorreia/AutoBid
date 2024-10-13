import Header from '@app/components/header/Header'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import { VehicleModel } from '@data/model/VehicleModel'
import { RootState } from '@data/redux/RootReducer'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavourite } from '../dashboard/VehiclesSlice'
import VehicleListItem from '../dashboard/components/VehicleListItem'


type Props = NativeStackScreenProps<RootStackParamList, 'Favourite'> & {}

const FavouriteScreen = ({}: Props) => {
  const dispatch = useDispatch()

  const favouriteList = useSelector((state: RootState) => state.vehicles.favouriteList)

  const onVehiclePress = (item: VehicleModel) => {
    NavigationManager.navigateVehicleDetails({ data: item })
  }

  const onFavouritePress = async (item: VehicleModel) => {
    dispatch(toggleFavourite(item))
  }

  const keyVehicleExtractor = (item: VehicleModel, index: number): string => {
    return `${item.auctionDateTime}+${index}`
  }

  const renderVehicleItem = (data: ListRenderItemInfo<VehicleModel>) => {
    return (
      <VehicleListItem
        item={data.item}
        onPress={onVehiclePress}
        onFavouritePress={onFavouritePress}
      />
    )
  }

  const renderVehicleSeparator = () => <View style={styles.itemSeparator} />

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header
            title={'Favourites'}
            titleStyle={styles.title}
            hasLogo
            hasMenu
          />
        <View style={styles.listContainer}/>
        
        <FlatList
          data={favouriteList}
          style={styles.flatList}
          keyExtractor={keyVehicleExtractor}
          renderItem={renderVehicleItem}
          // onEndReached={loadMoreItems}
          // onEndReachedThreshold={0.2}
          ItemSeparatorComponent={renderVehicleSeparator}
          ListFooterComponent={<View style={styles.marginBottom} />}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:Colors.white
  },
  title: {
    color: Colors.black,
  },
  listContainer:{
    marginTop:30
  },
  itemSeparator: {
    marginTop: 20,
  },
  flatList: {
    paddingTop: 10,
  },
  marginBottom: {
    height: 50,
  },
  loading: {
    paddingVertical: 20,
    alignItems: 'center',
  },
})

export default FavouriteScreen
