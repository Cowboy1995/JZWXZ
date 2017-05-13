/**
 * Created by Tong on 2017/5/12.
 */
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
    Image,
    Button
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
export default class MomentsScene extends Component {
    static navigationOptions = ({ navigation }) => ({

        headerStyle: { backgroundColor: color.theme },
    })
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Mine')}
                title="Go to notifications"
            />
        );
    }
}