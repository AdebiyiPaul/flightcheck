import React from 'react';
import {BoldText} from './BoldText';
import {Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import {LIGHTER_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from "../shared/Colors";

export const CommonHeader = (props) => {
    const leftSide = () => {
        return props.backAction
            ? <Appbar.BackAction onPress={props.backActionPress} color={LIGHTER_COLOR}/>
            : <Appbar.Action icon={'menu'} color={LIGHTER_COLOR} onPress={props.menuButtonPress}/>
    };

    return (
        <Appbar.Header style={{height: Platform.OS === 'ios' ? 40 : 55, backgroundColor: PRIMARY_COLOR}}>
            {leftSide()}

            <Appbar.Content
                title={<BoldText label={props.title} size={18} color={LIGHTER_COLOR}/>}
            />

            <Appbar.Action icon={props.rightIcon} color={LIGHTER_COLOR} onPress={props.rightActionPress}/>
        </Appbar.Header>
    );
};
