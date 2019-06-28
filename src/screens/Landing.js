import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import { CONTAINER_STYLE } from '../shared/Styles';
import {
    CommonHeader,
    DatePickerButton,
    CustomLoader,
    CommonButton
} from '../components';
import { connect } from 'react-redux';
import { TextInput} from 'react-native-paper';
import {selectAirportCategory, updateFetchAirportValues, fetchAirportSchedule} from "../store/actions";

class Landing extends Component {

    onFetchButtonPressed() {
        this.props.fetchAirportSchedule({},
            this.props.selectedOriginAirportCode,
            this.props.selectedDestinationAirportCode,
            this.props.navigation);
    }

    airportSelectBox(category)
    {
        this.props.selectAirportCategory(category);
        this.props.navigation.navigate('FetchAirport');
    }

    render() {

        const {selectedOriginAirportName, selectedDestinationAirportName, loading} = this.props;
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Airport'
                />

                <View style={{flex: 1}}>

                    <ScrollView style={{flex: 1, padding: 20}}>

                        <TextInput
                            mode='outlined'
                            label='Departure Airport'
                            render={props =>
                                <DatePickerButton
                                    {...props}
                                    icon='arrow-drop-down'
                                    value={selectedOriginAirportName}
                                    onPress={() => this.airportSelectBox('origin')}
                                />
                            }
                            style={inputStyle}
                            value={selectedOriginAirportName}
                            onChangeText={(val) => updateFetchAirportValues('selectedOriginAirportName', val)}
                        />

                        <TextInput
                            mode='outlined'
                            label='Destination Airport'
                            render={props =>
                                <DatePickerButton
                                    {...props}
                                    icon='arrow-drop-down'
                                    value={selectedDestinationAirportName}
                                    onPress={() => this.airportSelectBox('destination')}
                                />
                            }
                            style={inputStyle}
                            value={selectedDestinationAirportName}
                            onChangeText={(val) => updateFetchAirportValues('selectedDestinationAirportName', val)}
                        />

                        <CommonButton
                            label='Fetch airline schedules'
                            onPress={() => this.onFetchButtonPressed()}
                            style={{marginBottom: 30}}
                        />

                    </ScrollView>

                    <CustomLoader visible={loading} />

                </View>

            </View>
        );
    }
}

const styles = {
    inputStyle: {
        marginBottom: 15,
        fontFamily: 'Lato'
    }
};

const { inputStyle } = styles;

const mapStateToProps = (state) => {
    return state.airportData;
};

export default connect(mapStateToProps, {updateFetchAirportValues, selectAirportCategory, fetchAirportSchedule})(Landing);