import { combineReducers } from 'redux';
import airportReducer from './AirportReducer';

export default combineReducers({
    airportData: airportReducer,
});