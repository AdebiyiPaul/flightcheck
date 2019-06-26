import React, {Component} from 'react';
import {ImageBackground, View, Image} from 'react-native';
import {GET_PENCOMPIN} from '../shared/Storage';

class Splash extends Component {

    async componentDidMount() {

        setTimeout(async () => {
            const routeName = 'Landing';
            this.props.navigation.navigate(routeName);
        }, 1000);
    }

    render() {
        return (
            <View
                style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Image
                    source={require('../assets/images/plane.png')}
                    style={{
                        height: 250,
                        width: 250
                    }}
                    resizeMode='cover'
                />
            </View>
        );
    }
}

export default Splash;
