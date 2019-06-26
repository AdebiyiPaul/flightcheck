const INITIAL_VALUES = {
    loading: false,
    errorMessage: '',
    airportList: [],
    selectedOriginAirportCode: '',
    selectedOriginAirportName: '',
    selectedOriginAirportCoordinate: '',
    selectedDestinationAirportCode: '',
    selectedDestinationAirportName: '',
    selectedDestinationAirportCoordinate: '',
    selectedAirportCategory: '',
    airportScheduleList: [],
};

const airportReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'FETCH_AIRPORT_LIST':
            return { ...state, loading: action.payload };
        case 'FETCH_AIRPORT_LIST_DONE':
            return { ...state, loading: false, airportList: action.payload };
        case 'FETCH_AIRPORT_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SELECT_ORIGIN_AIRPORT_CODE':
            return { ...state, selectedOriginAirportCode: action.payload };
        case 'SELECT_ORIGIN_AIRPORT_NAME':
            return { ...state, selectedOriginAirportName: action.payload };
        case 'SELECT_ORIGIN_AIRPORT_COORDINATE':
            return { ...state, selectedOriginAirportCoordinate: action.payload };
        case 'SELECT_DESTINATION_AIRPORT_CODE':
            return { ...state, selectedDestinationAirportCode: action.payload };
        case 'SELECT_DESTINATION_AIRPORT_NAME':
            return { ...state, selectedDestinationAirportName: action.payload };
        case 'SELECT_DESTINATION_AIRPORT_COORDINATE':
            return { ...state, selectedDestinationAirportCoordinate: action.payload };
        case 'SELECT_AIRPORT_CATEGORY':
            return { ...state, selectedAirportCategory: action.payload };
        case 'FETCH_AIRPORT_SCHEDULE_LIST':
            return { ...state, loading: true };
        case 'FETCH_AIRPORT_SCHEDULE_LIST_DONE':
            return { ...state, loading: false, airportScheduleList: action.payload };
        case 'FETCH_AIRPORT_SCHEDULE_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    }
};

export default airportReducer;
