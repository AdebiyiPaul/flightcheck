/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar, View, SafeAreaView, Platform } from 'react-native';
import { DARK_PRIMARY_COLOR, PRIMARY_COLOR } from './src/shared/Colors';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import reducers from './src/store/reducers';
import Thunk from 'redux-thunk';
import Page from './src/screens/Routes';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: PRIMARY_COLOR
    }
};

const store = createStore(reducers, {}, applyMiddleware(Thunk));

export default class App extends React.Component {

    statusBarIOS() {
        if (Platform.OS === 'ios') {
            return <View style={{ backgroundColor: PRIMARY_COLOR, height: 22 }} />
        }

        return null
    }

    render() {
        return (
            <Provider store={store}>
                <PaperProvider theme={theme}>
                    <View style={{ flex: 1 }}>
                        {this.statusBarIOS()}

                        <SafeAreaView style={{ flex: 1 }}>
                            <StatusBar backgroundColor={DARK_PRIMARY_COLOR} barStyle={'light-content'} />
                            <Page />
                        </SafeAreaView>
                    </View>
                </PaperProvider>
            </Provider>
        );
    }
}

console.disableYellowBox = true;