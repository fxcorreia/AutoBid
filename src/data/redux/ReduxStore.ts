import RootReducer from '@data/redux/RootReducer'
import { configureStore } from '@reduxjs/toolkit'

const ReduxStore = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

export default ReduxStore
export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
export type AppStore = typeof ReduxStore