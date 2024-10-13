import Header from '@app/components/header/Header'
import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { IconFilter, IconFilterFull } from '@assets/svg'
import { VehicleModel } from '@data/model/VehicleModel'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from 'react-native'
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

  const [searchVehicle, setSearchVehicle] = useState<string>('')

  const filteredVehicles = useShallowEqualAppSelector((state) => state.vehicles.filteredVehicles)

  const onVehiclePress = (item: VehicleModel) => {
    NavigationManager.navigateVehicleDetails({ data: item })
  }

  const onFavouritePress = async (item: VehicleModel) => {
    dispatch(toggleFavourite(item))
  }

  const [data, setData] = useState<VehicleModel[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const ITEMS_PER_PAGE = 10


  useEffect(() => {
    loadMoreItems()
  }, [])

  const loadMoreItems = () => {
    if (loading) return

    setLoading(true)
    const nextItems = vehicleList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    setData([...data, ...nextItems])
    setPage(page + 1)
    setLoading(false)
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

  //TODO: implement if I have time 
  // const getSearchedVehicle = async (name: string) => {
  //   console.log('Search: ', name)
  // }

  // const handler = useCallback(debounce(getSearchedVehicle, 600), [])
  
  // const onChange = (name: string) => {
  //   setSearchVehicle(name)
  //   handler(name)
  // }

  const onFilterPress = ()=> {
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
            {!isEmpty(filteredVehicles) ? <IconFilterFull height={24} /> : <IconFilter height={24}/> }
          </TouchableOpacity> 
          {/* <Text style={styles.subtitle}>{t('screens.dashboard.best_deals')}</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder={t('screens.dashboard.search')}
              placeholderTextColor={Colors.primary}
              selectionColor={Colors.primary}
              style={styles.textInput}
              value={searchVehicle}
              onChangeText={(name: string) => onChange(name)}
            />
          </View> */}
        </View>

        <FlatList
          data={!isEmpty(filteredVehicles) ? filteredVehicles : vehicleList}
          style={styles.flatList}
          keyExtractor={keyVehicleExtractor}
          renderItem={renderVehicleItem}
          onEndReached={loadMoreItems}
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
  searchContainer:{
    marginTop:10,
    paddingHorizontal: 16,
  },
  itemSeparator: {
    marginTop: 20,
  },
  flatList: {
    marginTop:20,
    paddingTop: 10,
  },
  marginBottom: {
    height: 50,
  },
  subtitle: {
    ...Styles.text.frontTitle,
    marginTop: 20,
  },
  searchBarContainer: {
    marginTop: 20,
    backgroundColor: Colors.primary_30Pct,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  textInput: {
    color: Colors.primary,
  },
  filterContainer:{
    alignSelf:'flex-end',
    backgroundColor: Colors.primary,
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8
  },
})

export default DashboardScreen
