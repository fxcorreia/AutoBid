import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import vehiclesData from '@data/vehicles.json' // Caminho para o seu JSON local de veículos
import { VehicleModel } from '@data/model/VehicleModel'

const SLICE_NAME = 'vehicles'

type VehiclesSliceState = {
  vehicleList: VehicleModel[]
  filteredVehicleList: VehicleModel[]
  favouriteList: VehicleModel[]
}

const initialState: VehiclesSliceState = {
  vehicleList: vehiclesData,  // Carrega os dados diretamente do JSON
  filteredVehicleList: [],
  favouriteList: [],
}

const VehiclesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearVehicleList: (state) => {
      state.vehicleList = []
    },
    setVehicleList: (state, action: PayloadAction<VehicleModel[]>) => {
      state.vehicleList = action.payload
    },
    filterVehicles: (state, action: PayloadAction<Partial<VehicleModel>>) => {
      state.filteredVehicleList = state.vehicleList.filter((vehicle:VehicleModel) => {
        return Object.entries(action.payload).every(([key, value]) => {
          return vehicle[key as keyof VehicleModel] === value;
        })
      });
    },
    clearFilteredVehicles: (state) => {
      state.filteredVehicleList = []
    },
    setFavouriteList: (state, action: PayloadAction<VehicleModel[]>) => {
      state.favouriteList = action.payload
    },
    toggleFavourite: (state, action: PayloadAction<VehicleModel>) => {
      const index = state.favouriteList.findIndex((vehicle: VehicleModel) => vehicle === action.payload)
      if (index === -1) {
        state.favouriteList.push(action.payload)
      } else {
        state.favouriteList.splice(index, 1)
      }
    },
  },
})

export default VehiclesSlice
