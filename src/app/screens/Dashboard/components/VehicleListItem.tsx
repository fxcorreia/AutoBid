import Colors from '@app/styles/Colors'
import Shadows from '@app/styles/Shadows'
import Styles from '@app/styles/Styles'
import { IconFavouriteEmpty, IconFavouriteFull } from '@assets/svg'
import { VehicleModel } from '@data/model/VehicleModel'
import _ from 'lodash'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  item: VehicleModel
  onPress: (item: VehicleModel) => void
  onFavouritePress: (item: VehicleModel) => void
  favouriteList?: number[]
}
const RANDOM_CAR_URL = 'https://loremflickr.com/240/180/car'
const VehicleListItem = ({ item, onPress, onFavouritePress, favouriteList }: Props) => {
  // const [t] = useTranslation()

  const getImage = () => {
      return { uri: RANDOM_CAR_URL }
  }

  const isFavourite = () => {
    return false
    // return favouriteList.includes(item.id)
  }

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={() => onPress(item)}>
      <Image style={styles.image} source={getImage()} resizeMode={'stretch'} />
      <View style={styles.vehicleDetails}>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {item.make}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.model}
          </Text>
        </View>
        <View>
          <Text style={styles.bid} numberOfLines={1}>
            Starting Bid
          </Text>
          <Text style={styles.title}>
            {!_.isNil(item.startingBid) ? item.startingBid + ' €': 'N/D'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favouriteContainer} onPress={() => onFavouritePress(item)}>
        {isFavourite() ? <IconFavouriteFull /> : <IconFavouriteEmpty />}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 16,
    padding:16,
    height: 170,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 10,
    ...Shadows.dp3
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    alignSelf:'center'
  },
  vehicleDetails: {
    marginLeft: 15,
    justifyContent:'space-between'
  },
  title: {
    ...Styles.text.bigText,
  },
  model: {
    ...Styles.text.title,
  },
  bid: {
    ...Styles.text.smallText,
  },
  favouriteContainer: {
    position:'absolute',
    height:40,
    width:40,
    alignItems:'center',
    justifyContent:'center',
    right:10,
    bottom:10,
  },
})

export default VehicleListItem
