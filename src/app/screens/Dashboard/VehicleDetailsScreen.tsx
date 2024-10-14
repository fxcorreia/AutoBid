import Header from '@app/components/header/Header'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import Images from '@assets/images'
import { IconAuction, IconCalendar, IconEngine, IconEuro, IconFuel, IconMileage } from '@assets/svg'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
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


const VehicleDetailsScreen = ({ route }: Props) => {
  const [t] = useTranslation()
  const vehicle = route.params.data
  const [timeRemaining, setTimeRemaining] = useState<string>('')

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const auctionDate = moment(vehicle.auctionDateTime, "YYYY/MM/DD HH:mm:ss")
      const currentDate = moment()

      const duration = moment.duration(auctionDate.diff(currentDate))
      if (duration.asSeconds() > 0) {
        const days = Math.floor(duration.asDays())
        const hours = Math.floor(duration.hours())
        setTimeRemaining(`${days} days and ${hours}h`)
      } else {
        setTimeRemaining(t('screens.vehicleDetails.auction_started'))
      }
    }

    calculateTimeRemaining()
    const intervalId = setInterval(calculateTimeRemaining, 3600000)
    return () => clearInterval(intervalId)
  }, [vehicle.auctionDateTime])

  const veicleSpecs = [
      { id: '1', icon: <IconCalendar height={30} />, label: t('screens.vehicleDetails.year'), value: vehicle.year },
      { id: '2', icon: <IconMileage height={30} />, label: t('screens.vehicleDetails.mileage'), value: vehicle.mileage },
      { id: '3', icon: <IconFuel height={30} />, label: t('screens.vehicleDetails.fuel'), value: vehicle.fuel },
      { id: '4', icon: <IconEngine height={30} />, label: t('screens.vehicleDetails.engine'), value: vehicle.engineSize },
      { id: '5', icon: <IconAuction height={30} />, label: t('screens.vehicleDetails.auction_date'), value: timeRemaining },
      { id: '6', icon: <IconEuro height={30} />, label: t('screens.vehicleDetails.bid_start'), value: vehicle.startingBid },
  ]

  return (
    <SafeAreaView id='main-container' edges={['top']} style={styles.mainContainer}>
      <Header title={vehicle.make +' - '+ vehicle.model} hasBackButton />
      <View style={styles.detailsContainer}>
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          style={styles.imageBackgroundContainer}
        >
          <Image style={styles.image} source={Images.carPlaceholder} resizeMode={'contain'} />
        </LinearGradient>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.vehicleSpecs}>
            {veicleSpecs.map((item,) => (
              <View style={styles.item} key={item.id}>
                {item.icon}
                <Text style={styles.labelSpec}>{item.label}</Text>
                <Text style={styles.valueSpec}>{item.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.summaryContainer}>
              <Text style={styles.summaryLabel}>{t('screens.vehicleDetails.details')}</Text>
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
    justifyContent: 'space-between',
    
  },
  item: {
    width: '33%',
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
