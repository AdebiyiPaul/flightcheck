import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import {selectAirportCategory, updateFetchAirportValues, fetchAirportSchedule} from "../store/actions";
import MapView, {Polyline} from "react-native-maps";

class DisplayMap extends Component {

    render() {
        const {selectedOriginAirportCoordinate, selectedDestinationAirportCoordinate} = this.props;
        return (

            <MapView
                style={ styles.map }
                region={{
                    latitude: selectedOriginAirportCoordinate.Latitude,
                    longitude: selectedOriginAirportCoordinate.Longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                <Polyline
                    coordinates={[
                        { latitude: selectedOriginAirportCoordinate.Latitude, longitude: selectedOriginAirportCoordinate.Longitude },
                        { latitude: selectedDestinationAirportCoordinate.Latitude, longitude: selectedDestinationAirportCoordinate.Longitude }
                    ]}
                    strokeColor="#3700B3" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={4}
                />
            </MapView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

const mapStateToProps = (state) => {
    return state.airportData;
};

export default connect(mapStateToProps, {updateFetchAirportValues, selectAirportCategory, fetchAirportSchedule})(DisplayMap);