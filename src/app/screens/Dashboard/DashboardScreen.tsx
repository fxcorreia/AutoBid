import NavigationManager from '@app/navigation/helpers/NavigationManager'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import VehicleListItem from './components/VehicleListItem'
import Header from '@app/components/header/Header'
import { VehicleModel } from '@data/model/VehicleModel'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'> & {}


const MOCK:VehicleModel[] = [
  {
    "make": "Toyota",
    "model": "C-HR",
    "engineSize": "1.8L",
    "fuel": "diesel",
    "year": 2022,
    "mileage": 743,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 17000,
    "favourite": true
  },
  {
    "make": "Ford",
    "model": "Fiesta",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2022,
    "mileage": 9084,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 15000,
    "favourite": false
  },
  {
    "make": "Toyota",
    "model": "Corolla",
    "engineSize": "1.6L",
    "fuel": "diesel",
    "year": 2020,
    "mileage": 17293,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 15000,
    "favourite": false
  },
  {
    "make": "Volkswagen",
    "model": "Polo",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2019,
    "mileage": 5025,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 17000,
    "favourite": true
  },
  {
    "make": "Volkswagen",
    "model": "Passat",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2021,
    "mileage": 5384,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 20000,
    "favourite": false
  },
  {
    "make": "Audi",
    "model": "A4",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2020,
    "mileage": 6375,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 16000,
    "favourite": true
  },
  {
    "make": "Volvo",
    "model": "V40",
    "engineSize": "1.8L",
    "fuel": "petrol",
    "year": 2021,
    "mileage": 14056,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 16000,
    "favourite": true
  },
  {
    "make": "Citroen",
    "model": "C5 Aircross",
    "engineSize": "1.8L",
    "fuel": "diesel",
    "year": 2022,
    "mileage": 8051,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 16000,
    "favourite": false
  },
  {
    "make": "Audi",
    "model": "A4",
    "engineSize": "1.8L",
    "fuel": "petrol",
    "year": 2023,
    "mileage": 7530,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 15000,
    "favourite": true
  },
  {
    "make": "Ford",
    "model": "Focus",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2019,
    "mileage": 7128,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 15000,
    "favourite": false
  },
  {
    "make": "BMW",
    "model": "1 Series",
    "engineSize": "1.6L",
    "fuel": "diesel",
    "year": 2021,
    "mileage": 4007,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 20000,
    "favourite": false
  },
  {
    "make": "Ford",
    "model": "Focus",
    "engineSize": "1.8L",
    "fuel": "diesel",
    "year": 2022,
    "mileage": 18933,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 20000,
    "favourite": false
  },
  {
    "make": "Volvo",
    "model": "C30",
    "engineSize": "1.6L",
    "fuel": "diesel",
    "year": 2022,
    "mileage": 14265,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 15000,
    "favourite": true
  },
  {
    "make": "Toyota",
    "model": "Corolla",
    "engineSize": "1.8L",
    "fuel": "petrol",
    "year": 2019,
    "mileage": 7008,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 20000,
    "favourite": true
  },
  {
    "make": "Citroen",
    "model": "C3 Aircross",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2021,
    "mileage": 13920,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 14000,
    "favourite": false
  },
  {
    "make": "Toyota",
    "model": "C-HR",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2023,
    "mileage": 7897,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 15000,
    "favourite": true
  },
  {
    "make": "Volkswagen",
    "model": "Passat",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2020,
    "mileage": 6255,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 17000,
    "favourite": false
  },
  {
    "make": "Volkswagen",
    "model": "Passat",
    "engineSize": "1.8L",
    "fuel": "diesel",
    "year": 2023,
    "mileage": 3316,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 20000,
    "favourite": true
  },
  {
    "make": "BMW",
    "model": "1 Series",
    "engineSize": "1.8L",
    "fuel": "diesel",
    "year": 2021,
    "mileage": 15470,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 14000,
    "favourite": false
  },
  {
    "make": "BMW",
    "model": "1 Series",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2019,
    "mileage": 16674,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 20000,
    "favourite": true
  },
  {
    "make": "Volvo",
    "model": "V40",
    "engineSize": "1.6L",
    "fuel": "diesel",
    "year": 2021,
    "mileage": 8148,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 16000,
    "favourite": false
  },
  {
    "make": "Ford",
    "model": "Focus C-Max",
    "engineSize": "1.6L",
    "fuel": "diesel",
    "year": 2022,
    "mileage": 251,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 17000,
    "favourite": false
  },
  {
    "make": "Ford",
    "model": "Focus C-Max",
    "engineSize": "1.6L",
    "fuel": "petrol",
    "year": 2021,
    "mileage": 12714,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 16000,
    "favourite": false
  },
  {
    "make": "BMW",
    "model": "3 Series",
    "engineSize": "1.8L",
    "fuel": "petrol",
    "year": 2022,
    "mileage": 19579,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 14000,
    "favourite": false
  },
  {
    "make": "Volkswagen",
    "model": "Passat",
    "engineSize": "1.8L",
    "fuel": "diesel",
    "year": 2021,
    "mileage": 3698,
    "auctionDateTime": "2024/04/15 09:00:00",
    "startingBid": 16000,
    "favourite": true
  },
  {
    "make": "Volvo",
    "model": "V40",
    "engineSize": "1.8L",
    "fuel": "petrol",
    "year": 2023,
    "mileage": 9856,
    "auctionDateTime": "2024/04/15 13:00:00",
    "startingBid": 17000,
    "favourite": true
  }
]

const DashboardScreen = ({}: Props) => {
//   const [t] = useTranslation()

  const navigateSearchScreen = async () => {
    console.log('goto search')
    // NavigationManager.navigateProfile()
    NavigationManager.navigateSearch({ value: '123' })
  }

  const onVehiclePress = (item: VehicleModel) => {
    console.log('onVehiclePress', item)
    // NavigationManager.navigateSerieDetailsScreen({ data: item })
  }

  const onFavouritePress = async (item: VehicleModel) => {
    console.log('onFavouritePress', item)

  }

  const [data, setData] = useState<VehicleModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const ITEMS_PER_PAGE = 10;


  useEffect(() => {
    loadMoreItems(); // Carrega os primeiros itens ao montar o componente
  }, []);

  const loadMoreItems = () => {
    console.log('loading:',loading)
    if (loading) return;

    setLoading(true);
    const nextItems = MOCK.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    setData([...data, ...nextItems]);
    setPage(page + 1);
    setLoading(false);
  };

  const keyVehicleExtractor = (item: VehicleModel, index: number): string => {
    return `${item.auctionDateTime}+${index}`
  }

  const renderVehicleItem = (data: ListRenderItemInfo<VehicleModel>) => {
    return (
      <VehicleListItem
        item={data.item}
        onPress={onVehiclePress}
        onFavouritePress={onFavouritePress}
        // favouriteList={getFavouritesId}
      />
    )
  }

  const renderVehicleSeparator = () => <View style={styles.itemSeparator} />

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <LinearGradient colors={[Colors.white, Colors.gradientEnd]} style={styles.mainContainer}>
        <Header
            title={'AUTOBID'}
            titleStyle={styles.title}
            hasLogo
            hasMenu
          />
        <View style={styles.listContainer}/>
        
        <FlatList
          data={data}
          style={styles.flatList}
          keyExtractor={keyVehicleExtractor}
          renderItem={renderVehicleItem}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.2} // Carrega mais quando chegar a 20% do final da lista
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

export default DashboardScreen
