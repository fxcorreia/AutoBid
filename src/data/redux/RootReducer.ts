import AppSlice from '@app/screens/app/AppSlice'
import VehiclesSlice from '@app/screens/dashboard/VehiclesSlice'
import { combineReducers } from '@reduxjs/toolkit'

const RootReducer = combineReducers({
  app: AppSlice.reducer,
  vehicles: VehiclesSlice.reducer,
})

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer
