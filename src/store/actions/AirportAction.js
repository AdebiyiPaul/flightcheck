import { LOGGER } from "../../shared/Methods";
import {FETCH_AIRPORT_API, FETCH_AIRPORT_SCHEDULE_API, SERVER_REQUEST} from "../../shared/Backend";

export const updateFetchAirportValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

export const fetchAirportList = (body, offset) => {
    return async (dispatch) => {
        LOGGER('offset', offset)
        if(offset === 0)
            dispatch({ type: 'FETCH_AIRPORT_LIST', payload: true });
        else
            dispatch({ type: 'FETCH_AIRPORT_LIST', payload: false });

        const api = FETCH_AIRPORT_API + '/?limit=100&offset=' + offset + '&LHoperated=0';

        try {
            const response = await SERVER_REQUEST(body, api, 'GET');

            LOGGER('res', response.AirportResource.Airports.Airport);

            dispatch({ type: 'FETCH_AIRPORT_LIST_DONE', payload: response.AirportResource.Airports.Airport });
        }
        catch (error) {
            dispatch({type: 'FETCH_AIRPORT_LIST_FAILED', payload: error.message});
        }
    };
};

export const fetchAirportSchedule = (body, origin, destination, navigation) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_AIRPORT_SCHEDULE_LIST', payload: true });

        const api = FETCH_AIRPORT_SCHEDULE_API + '/' + origin + '/' + destination + '/2019-09-09?directFlights=0';

        LOGGER('FETCH_AIRPORT_SCHEDULE_API', FETCH_AIRPORT_SCHEDULE_API)
        LOGGER('api', api)

        // 'operations/schedules/ZRH/FRA/2019-09-09?directFlights=0'

        try {
            const response = await SERVER_REQUEST(body, api, 'GET');

            let scheduleData = [];
            const res = response.ScheduleResource.Schedule;

            LOGGER('res', res)

            if(!Array.isArray(res))
                scheduleData.push(res);
            else
                scheduleData = res;

            let aircraftCode = '';
            let flightNumber = 0;
            let flightData = [];

            scheduleData.filter((data) => {
                const flights = data.Flight;

                if(Array.isArray(flights))
                {
                    flights.filter((data2) => {

                        aircraftCode = data2.Equipment.AircraftCode;
                        flightNumber = data2.MarketingCarrier.FlightNumber;

                        const request = {
                            aircraftCode: aircraftCode,
                            flightNumber: flightNumber,
                            duration: data.TotalJourney.Duration
                        };

                        flightData.push(request)
                    });
                }
                else
                {
                    aircraftCode = flights.Equipment.AircraftCode;
                    flightNumber = flights.MarketingCarrier.FlightNumber;

                    const request = {
                        aircraftCode: aircraftCode,
                        flightNumber: flightNumber,
                        duration: data.TotalJourney.Duration
                    };

                    flightData.push(request)
                }
            });

            dispatch({ type: 'FETCH_AIRPORT_SCHEDULE_LIST_DONE', payload: flightData });
            navigation.navigate('AirlineSchedule');
        }
        catch (error) {
            dispatch({type: 'FETCH_AIRPORT_SCHEDULE_LIST_FAILED', payload: error.message});
        }
    };
};

export const selectAirportCategory = (selectedAirportCategory) => {
    return {
        type: 'SELECT_AIRPORT_CATEGORY',
        payload: selectedAirportCategory
    };
};

export const selectOriginAirportCode = (selectedAirport) => {
    return {
        type: 'SELECT_ORIGIN_AIRPORT_CODE',
        payload: selectedAirport
    };
};

export const selectOriginAirportName = (selectedAirport) => {
    return {
        type: 'SELECT_ORIGIN_AIRPORT_NAME',
        payload: selectedAirport
    };
};

export const selectOriginAirportCoordinate = (selectedAirport) => {
    return {
        type: 'SELECT_ORIGIN_AIRPORT_COORDINATE',
        payload: selectedAirport
    };
};

export const selectDestinationAirportCode = (selectedAirport) => {
    return {
        type: 'SELECT_DESTINATION_AIRPORT_CODE',
        payload: selectedAirport
    };
};

export const selectDestinationAirportName = (selectedAirport) => {
    return {
        type: 'SELECT_DESTINATION_AIRPORT_NAME',
        payload: selectedAirport
    };
};

export const selectDestinationAirportCoordinate = (selectedAirport) => {
    return {
        type: 'SELECT_DESTINATION_AIRPORT_COORDINATE',
        payload: selectedAirport
    };
};