import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';

import LandingScreen from './Landing';
import SplashScreen from './Splash';
import FetchAirportScreen from './AirportList';
import AirlineScheduleListScreen from './AirlineScheduleList';
import DisplayMapScreen from './DisplayMap';

const LandingRoute = createStackNavigator({
    Landing: LandingScreen,
    FetchAirport: FetchAirportScreen,
    AirlineSchedule: AirlineScheduleListScreen,
    DisplayMap: DisplayMapScreen,
}, {
    initialRouteName: 'Landing',
    headerMode: 'none'
});

const MainRoute = createSwitchNavigator({
    LandingRoute: LandingRoute,
    Splash: SplashScreen,
}, {
    initialRouteName: 'Splash'
});

export default createAppContainer(MainRoute);
