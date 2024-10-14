import Header from '@app/components/header/Header'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { IconFilter } from '@assets/svg'
import { VehicleModel } from '@data/model/VehicleModel'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import VehicleListItem from './components/VehicleListItem'
import { toggleFavourite } from './VehiclesSlice'

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'> & {}

const DashboardScreen = ({}: Props) => {
  const dispatch = useDispatch()
  const [t] = useTranslation()
  const vehicleList = useShallowEqualAppSelector((state) => state.vehicles.vehicleList)
  const filteredVehicles = useShallowEqualAppSelector((state) => state.vehicles.filteredVehicles)
  const appliedFilters = useShallowEqualAppSelector((state) => state.vehicles.appliedFilters)

  const [data, setData] = useState<VehicleModel[]>([])
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const ITEMS_PER_PAGE = 10

  const onVehiclePress = (item: VehicleModel) => {
    NavigationManager.navigateVehicleDetails({ data: item })
  }

  const onFavouritePress = async (item: VehicleModel) => {
    dispatch(toggleFavourite(item))
  }

  const hasActiveFilters = () => {
    return Object.values(appliedFilters).some((value) => {
      return value !== null && value !== undefined
    })
  }
  
  const loadMoreItems = useCallback((reset = false) => {
    if (loading) return

    setLoading(true)    
    const allVehicles = !isEmpty(filteredVehicles) ? filteredVehicles : vehicleList
    const startIndex = reset ? 0 : page * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const newItems = allVehicles.slice(startIndex, endIndex)

    setData(prevData => reset ? newItems : [...prevData, ...newItems])
    setPage(prevPage => prevPage + 1)
    setLoading(false)
  }, [filteredVehicles, vehicleList, page, loading])

  useEffect(() => {
    if (hasActiveFilters() && isEmpty(filteredVehicles)) {
      setData([])
    } else {
      setPage(0)
      loadMoreItems(true)
    }
  }, [filteredVehicles, vehicleList])

  const keyVehicleExtractor = useCallback((item: VehicleModel, index: number): string => {
    return `${item.auctionDateTime}+${index}`
  },[])

  const renderVehicleItem = useCallback( (data: ListRenderItemInfo<VehicleModel>) => (
    <VehicleListItem
      item={data.item}
      onPress={onVehiclePress}
      onFavouritePress={onFavouritePress}
    />
  ), [onVehiclePress, onFavouritePress])

  const renderVehicleSeparator = () => <View style={styles.itemSeparator} />

  const onFilterPress = () => {
    NavigationManager.navigateFilter()
  }
  
  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header
            title={'AUTOBID'}
            titleStyle={styles.title}
            hasLogo
            hasMenu
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterContainer} onPress={onFilterPress}>
              {hasActiveFilters() && <View style={styles.activeFilters}/>}
            <IconFilter height={24}/>
          </TouchableOpacity> 
        </View>
        <FlatList
          data={data}
          style={styles.flatList}
          keyExtractor={keyVehicleExtractor}
          renderItem={renderVehicleItem}
          onEndReached={() => loadMoreItems()}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={renderVehicleSeparator}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color={Colors.primary} /> : null}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.black,
  },
  searchContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  itemSeparator: {
    marginTop: 20,
  },
  flatList: {
    marginTop: 20,
    paddingTop: 10,
  },
  filterContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeFilters:{
    position:'absolute', 
    zIndex:10, 
    top:-3, 
    right:-3, 
    backgroundColor:Colors.red, 
    height:12,
    width:12, 
    borderRadius:6
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    ...Styles.text.frontTitle,
    color: Colors.primary,
    textAlign: 'center',
  },
})

export default DashboardScreen
