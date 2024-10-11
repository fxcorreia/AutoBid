import { RootState } from '@data/redux/RootReducer'
import { shallowEqual } from 'react-redux'
import useAppSelector from './useAppSelector'

const useShallowEqualAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
): TSelected => {
  return useAppSelector(selector, shallowEqual)
}

export default useShallowEqualAppSelector
