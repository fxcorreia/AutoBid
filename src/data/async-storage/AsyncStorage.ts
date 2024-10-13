import { VehicleModel } from '@data/model/VehicleModel'
import RNAsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'

enum StorageItem {
    VEHICLE_LIST = 'VEHICLE_LIST', 
    FAVOURITE_LIST = 'FAVOURITE_LIST',
}

const _getModel = async <T>(storageKey: string) => {
  try {
    const data = await RNAsyncStorage.getItem(storageKey)

    if (!_.isNil(data)) {
      return JSON.parse(data) as T
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

const _setModel = async (storageKey: string, data: object) => {
  return RNAsyncStorage.setItem(storageKey, JSON.stringify(data))
}

const getVehicleList = async (): Promise<VehicleModel[] | null> => {
  const list = _getModel<VehicleModel[]>(StorageItem.VEHICLE_LIST)
  return list ?? []
}

const setVehicleList = async (value: VehicleModel[]) => {
  return _setModel(StorageItem.VEHICLE_LIST, value)
}

const getFavouriteList = async (): Promise<VehicleModel[] | null> => {
  const list = _getModel<VehicleModel[]>(StorageItem.FAVOURITE_LIST)
  return list ?? []
}

const setFavouriteList = async (value: VehicleModel[]) => {
  return _setModel(StorageItem.FAVOURITE_LIST, value)
}

const AsyncStorage = {
    getVehicleList,
    setVehicleList,
    getFavouriteList,
    setFavouriteList,
}

export default AsyncStorage
