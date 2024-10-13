import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import vehiclesData from '@data/vehicles.json' // JSON dos veículos
import { VehicleModel } from '@data/model/VehicleModel'
import { AppCreateAsyncThunkConfig } from '@data/redux/ReduxTypes'
import AsyncStorage from '@data/async-storage/AsyncStorage'

export type FilterVehicles = {
  make: string[] | null ,
  model: string[] | null ,
  minBid: number | undefined,
  maxBid: number | undefined,
  favourite: boolean,
}

type VehiclesSliceState = {
  vehicleList: VehicleModel[]
  favouriteList: VehicleModel[]
  filteredVehicles: VehicleModel[]
  appliedFilters: FilterVehicles
}

const initialState: VehiclesSliceState = {
  vehicleList: [],
  favouriteList: [],
  filteredVehicles: [],
  appliedFilters: {
    make: null,
    model: null,
    minBid: undefined,
    maxBid: undefined,
    favourite: false
  }
}

let counter = 0
const generateId = () => {
  counter += 1
  return `${Date.now()}-${counter}`
}

const prepareVehicleData = (vehicles: any[]): VehicleModel[] => {
  return vehicles.map(vehicle => ({
    ...vehicle,
    id: generateId(),
  }))
}


const loadFavourites = async (vehicleList: VehicleModel[]): Promise<VehicleModel[]> => {
  const savedFavourites = await AsyncStorage.getFavouriteList()
  const favouriteIds = savedFavourites ? savedFavourites.map((fav: VehicleModel) => fav.id) : []

  return vehicleList.filter(vehicle => vehicle.favourite || favouriteIds.includes(vehicle.id))
}


const initializeVehicles = createAsyncThunk<void, void, AppCreateAsyncThunkConfig>(
  'vehicles/initializeVehicles',
  async (_, { dispatch, getState }) => {
    const savedVehicleList = await AsyncStorage.getVehicleList()
    
    if (!savedVehicleList) {
      const preparedVehicleData = prepareVehicleData(vehiclesData)
      await AsyncStorage.setVehicleList(preparedVehicleData)
      
      dispatch(initializeVehicleList(preparedVehicleData))
      
      const favouriteList = await loadFavourites(preparedVehicleData)
      dispatch(syncFavourites(favouriteList))
    } else { 
      dispatch(initializeVehicleList(savedVehicleList))
      
      const favouriteList = await loadFavourites(savedVehicleList)
      dispatch(syncFavourites(favouriteList))
    }
  }
)


const filterVehicles = (vehicles: VehicleModel[], filters: FilterVehicles): VehicleModel[] => {
  return vehicles.filter((vehicle) => {
    const matchesMake = !filters.make || filters.make.length === 0 || filters.make.includes(vehicle.make)
    const matchesModel = !filters.model || filters.model.length === 0 || filters.model.includes(vehicle.model)

    const matchesMinBid = filters.minBid === undefined || vehicle.startingBid >= filters.minBid
    const matchesMaxBid = filters.maxBid === undefined || vehicle.startingBid <= filters.maxBid
    const matchesFavourite = filters.favourite === null || vehicle.favourite === filters.favourite

    return matchesMake && matchesModel && matchesMinBid && matchesMaxBid && matchesFavourite
  })
}


const VehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    initializeVehicleList: (state, action: PayloadAction<VehicleModel[]>) => {
      state.vehicleList = action.payload
    },
    syncFavourites: (state, action: PayloadAction<VehicleModel[]>) => {
      state.favouriteList = action.payload
      state.vehicleList = state.vehicleList.map(vehicle => ({
        ...vehicle,
        favourite: action.payload.some(favVehicle => favVehicle.id === vehicle.id) || vehicle.favourite,
      }))
    },
    toggleFavourite: (state, action: PayloadAction<VehicleModel>) => {
      const vehicle = action.payload
      const isFavourite = state.favouriteList.some(favVehicle => favVehicle.id === vehicle.id)

      const updatedVehicle = { ...vehicle, favourite: !isFavourite }
    
      state.vehicleList = state.vehicleList.map(v =>
        v.id === vehicle.id ? updatedVehicle : v
      )

      AsyncStorage.setVehicleList(state.vehicleList)
    
      if (isFavourite) {
        state.favouriteList = state.favouriteList.filter(favVehicle => favVehicle.id !== vehicle.id)
      } else {
        state.favouriteList.push(updatedVehicle)
      }
    
      AsyncStorage.setFavouriteList(state.favouriteList)
    },
    setFilteredVehicles: (state, action: PayloadAction<FilterVehicles>) => {
      state.filteredVehicles = filterVehicles(state.vehicleList, action.payload)
    },
    setAppliedFilters(state, action) {
      state.appliedFilters = action.payload
    },
    clearAppliedFilters(state) {
      state.appliedFilters = {
        make: null,
        model: null,
        minBid: undefined,
        maxBid: undefined,
        favourite: false
      }
    },
    resetFilteredVehicles(state) {
      state.filteredVehicles = []
    }
  },

  extraReducers: (builder) => {
    builder.addCase(initializeVehicles.fulfilled, (state) => {
    })
  },
})

export const { initializeVehicleList, syncFavourites, toggleFavourite, setFilteredVehicles, setAppliedFilters, clearAppliedFilters, resetFilteredVehicles } = VehiclesSlice.actions
export { initializeVehicles }
export default VehiclesSlice
