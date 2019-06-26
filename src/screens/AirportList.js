import React, { Component } from 'react';
import { View, FlatList} from 'react-native';
import { CONTAINER_STYLE } from '../shared/Styles';
import { CommonHeader, BoldText,  CustomLoader } from '../components/index';
import { List, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import {LOGGER} from "../shared/Methods";
import {
    fetchAirportList,
    selectDestinationAirportCode, selectDestinationAirportCoordinate, selectDestinationAirportName,
    selectOriginAirportCode, selectOriginAirportCoordinate,
    selectOriginAirportName
} from "../store/actions";
import {PRIMARY_COLOR} from "../shared/Colors";

class AirportList extends Component {

    state = {
        offset: 0,
    };

    componentDidMount() {
        this.fetchAirport(this.state.offset);
    }

    fetchAirport(offset)
    {
        this.props.fetchAirportList({}, offset);
        const newOffset = offset + 100;
        this.setState({offset: newOffset});
    }

    _renderItem(item, index) {
        const names = item.Names.Name;
        let name = '';
        if(Array.isArray(names))
        {
            names.filter((data) => {

                if(data['@LanguageCode'] === 'EN')
                {
                    name = data['$'];
                }
            });
        }
        else
        {
            if(names['@LanguageCode'] === 'EN')
            {
                name = names['$'];
            }
        }

        return <List.Item
            title={<BoldText label={name} />}
            description={item.AirportCode}
            descriptionStyle={{fontSize: 14, color: PRIMARY_COLOR, marginTop: 5, fontFamily: 'Lato-Regular'}}
            onPress={() => this.selectAirportButton(item, name)}
        />
    }

    selectAirportButton(item, airportName)
    {
        if(this.props.selectedAirportCategory === 'origin')
        {
            this.props.selectOriginAirportCode(item.AirportCode);
            this.props.selectOriginAirportName(airportName);
            this.props.selectOriginAirportCoordinate(item.Position.Coordinate);
        }
        else if(this.props.selectedAirportCategory === 'destination')
        {
            this.props.selectDestinationAirportCode(item.AirportCode);
            this.props.selectDestinationAirportName(airportName);
            this.props.selectDestinationAirportCoordinate(item.Position.Coordinate);
        }

        this.props.navigation.goBack();
    }

    render() {
        const { airportList, loading } = this.props;
        LOGGER('airportList', airportList);

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Airport List' backAction backActionPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={airportList}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={Divider}
                    onEndReached={() => this.fetchAirport(this.state.offset)}
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
    selectOriginAirportCoordinate,
    selectDestinationAirportCoordinate
})(AirportList);