import NavigationService from './NavigationService'
import { VehicleDetailsNavProps } from './types/RootStackNavigationTypes'

const navigateDashboard = () => {
  NavigationService.navigate('Dashboard')
}

const navigateFavourite = () => {
  NavigationService.navigate('Favourite')
}

const navigateFilter = () => {
  NavigationService.navigate('Filter')
}

const navigateVehicleDetails = (params: VehicleDetailsNavProps) => {
  NavigationService.navigate('VehicleDetails', params)
}

const NavigationManager = {
    navigateDashboard,
    navigateFavourite,
    navigateVehicleDetails,
    navigateFilter
}

export default NavigationManager
