import Header from '@app/components/header/Header'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { IconAuction, IconCalendar, IconEngine, IconEuro, IconFuel, IconMileage } from '@assets/svg'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetails'> & {}

const RANDOM_CAR_URL = 'https://loremflickr.com/240/180/car'

const VehicleDetailsScreen = ({ route }: Props) => {
  const [t] = useTranslation()
  const vehicle = route.params.data

  const isFavourite = () => {
    // return false
    return vehicle.favourite
  }

  const onFavouritePress = async () => {
    console.log('onFavouritePress')

  }

  const getImage = () => {
    return { uri: RANDOM_CAR_URL }
  }

    const veicleSpecs = [
        { id: '1', icon: <IconCalendar height={30} />, label: t('screens.vehicleDetails.year'), value: vehicle.year },
        { id: '2', icon: <IconMileage height={30} />, label: t('screens.vehicleDetails.mileage'), value: vehicle.mileage },
        { id: '3', icon: <IconFuel height={30} />, label: t('screens.vehicleDetails.fuel'), value: vehicle.fuel },
        { id: '4', icon: <IconEngine height={30} />, label: t('screens.vehicleDetails.engine'), value: vehicle.engineSize },
        { id: '5', icon: <IconAuction height={30} />, label: t('screens.vehicleDetails.auction_date'), value: vehicle.auctionDateTime },
        { id: '6', icon: <IconEuro height={30} />, label: t('screens.vehicleDetails.bid_start'), value: vehicle.startingBid },
    ];

    return (
        <SafeAreaView id='main-container'  edges={['top']} style={styles.mainContainer}>
            <Header
                title={vehicle.make +' - '+ vehicle.model }
                hasBackButton
                hasFavoutire
                isFavourite={isFavourite()}
                onFavouritePress={onFavouritePress}
            />
            <View style={styles.detailsContainer}>
                <LinearGradient
                    colors={[Colors.secondary, Colors.primary]}
                    style={styles.imageBackgroundContainer}
                >
                    <Image style={styles.image} source={getImage()} resizeMode={'contain'} />
                </LinearGradient>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.vehicleSpecs}>
                        {veicleSpecs.map((item) => (
                            <View style={styles.item}>
                                {item.icon}
                                <Text style={styles.labelSpec}>{item.label}</Text>
                                <Text style={styles.valueSpec}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryLabel}>Details</Text>
                        <Text style={styles.summary}>{t('screens.vehicleDetails.lorem_ipsum')}</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 8,
  },
  imageBackgroundContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: -70,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  vehicleSpecs: {
    marginTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    
  },
  item: {
    width: '30%',
    marginVertical: 16,
    alignItems: 'center',
  },
  labelSpec: {
    marginTop: 8,
    ...Styles.text.smallText,
  },
  valueSpec: {
    marginTop: 4,
    textAlign: 'center',
    ...Styles.text.values,
    textTransform:'uppercase'
  },
  summaryContainer:{
    paddingVertical:30,
    paddingHorizontal: 16
  },
  summaryLabel:{
    ...Styles.text.frontTitle,
  },
  summary:{
    marginTop:15,
    ...Styles.text.summary,
    lineHeight:20
  }
})

export default VehicleDetailsScreen
