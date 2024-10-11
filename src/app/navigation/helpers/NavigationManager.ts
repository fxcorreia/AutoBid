import NavigationService from './NavigationService'
import { SearchScreenNavProps } from './types/RootStackNavigationTypes'

const navigateDashboard = () => {
  NavigationService.navigate('Dashboard');
}

const navigateProfile = () => {
  NavigationService.navigate('Profile');
}

const navigateSearch = (params: SearchScreenNavProps) => {
  NavigationService.navigate('Search', params);
}

const NavigationManager = {
    navigateDashboard,
    navigateProfile,
    navigateSearch,
}

export default NavigationManager
