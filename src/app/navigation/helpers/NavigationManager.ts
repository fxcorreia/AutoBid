import NavigationService from './NavigationService'
import { SearchScreenNavProps, VehicleDetailsNavProps } from './types/RootStackNavigationTypes'

const navigateDashboard = () => {
  NavigationService.navigate('Dashboard');
}

const navigateProfile = () => {
  NavigationService.navigate('Profile');
}

const navigateFavourite = () => {
  NavigationService.navigate('Favourite');
}

const navigateSearch = (params: SearchScreenNavProps) => {
  NavigationService.navigate('Search', params);
}

const navigateVehicleDetails = (params: VehicleDetailsNavProps) => {
  NavigationService.navigate('VehicleDetails', params);
}

const NavigationManager = {
    navigateDashboard,
    navigateProfile,
    navigateSearch,
    navigateFavourite,
    navigateVehicleDetails
}

export default NavigationManager
