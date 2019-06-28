import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity} from 'react-native';
import { CONTAINER_STYLE } from '../shared/Styles';
import { CommonHeader, BoldText,  CustomLoader } from '../components/index';
import { Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import {LOGGER} from "../shared/Methods";
import {
    fetchAirportList,
    selectDestinationAirportCode, selectDestinationAirportName,
    selectOriginAirportCode,
    selectOriginAirportName
} from "../store/actions";
import {DARK_COLOR, TERTIARY_COLOR} from "../shared/Colors";
import {RegularText} from "../components";

class AirlineScheduleList extends Component {

    _renderItem(item, index) {
        return <TouchableOpacity
            style={{flexDirection: 'row', marginStart: 40, marginEnd: 40, justifyContent: 'space-between', paddingVertical: 25, marginTop: 20}}
            onPress={() => this.props.navigation.navigate('DisplayMap')}>
                <BoldText label={item.aircraftCode} color={DARK_COLOR}/>
                    <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <RegularText label={item.flightNumber} color={TERTIARY_COLOR} size={14} style={{fontStyle: 'italic'}}/>
                        <RegularText label={item.duration} color={TERTIARY_COLOR} size={14} style={{fontStyle: 'italic'}}/>
                    </View>
                </TouchableOpacity>
    }

    render() {
        const { airportScheduleList, loading } = this.props;
        LOGGER('airportScheduleList', airportScheduleList);

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Airline Schedule List' backAction backActionPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={airportScheduleList}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={Divider}
                />

                <CustomLoader visible={loading} />

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.airportData;
};

export default connect(mapStateToProps, {
    fetchAirportList,
    selectOriginAirportCode,
    selectOriginAirportName,
    selectDestinationAirportCode,
    selectDestinationAirportName,
})(AirlineScheduleList);