import Header from '@app/components/header/Header'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import { VehicleModel } from '@data/model/VehicleModel'
import { RootState } from '@data/redux/RootReducer'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavourite } from '../dashboard/VehiclesSlice'
import VehicleListItem from '../dashboard/components/VehicleListItem'
import Styles from '@app/styles/Styles'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'


type Props = NativeStackScreenProps<RootStackParamList, 'Favourite'> & {}

const FavouriteScreen = ({}: Props) => {
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const [data, setData] = useState<VehicleModel[]>([])
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const ITEMS_PER_PAGE = 10

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

  const loadMoreItems = useCallback((reset = false) => {
    if (loading) return

    setLoading(true)    
    const startIndex = reset ? 0 : page * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const newItems = favouriteList.slice(startIndex, endIndex)

    setData(prevData => reset ? newItems : [...prevData, ...newItems])
    setPage(prevPage => prevPage + 1)
    setLoading(false)
  }, [favouriteList, page, loading])

  useEffect(() => {
    if (isEmpty(favouriteList)) {
      setData([])
    } else {
      setPage(0)
      loadMoreItems(true)
    }
  }, [favouriteList])

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header
            title={t('screens.favourites.favourites')}
            titleStyle={styles.title}
            hasLogo
            hasMenu
          />
        <View style={styles.listContainer}/>
        <Text style={styles.counterLabel}>{t('screens.favourites.favourites_number')} {favouriteList.length}</Text>
        <FlatList
          data={data}
          style={styles.flatList}
          keyExtractor={keyVehicleExtractor}
          renderItem={renderVehicleItem}
          onEndReached={() => loadMoreItems()}
          onEndReachedThreshold={0.2}
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
  counterLabel:{
    ...Styles.text.values,
    color: Colors.primary,
    paddingLeft: 16,
    paddingBottom:10
  }
})

export default FavouriteScreen
