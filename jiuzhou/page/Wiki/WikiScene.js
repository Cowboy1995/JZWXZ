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
import {Paragraph} from '../../common/Text';
import NavigationItem from '../../common/NavigationItem';



export default class WikiScene extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon} />
                <Paragraph>搜索</Paragraph>
            </TouchableOpacity>
        ),
        headerRight: (
            <NavigationItem
                icon={require('../../img/Home/icon_navigationItem_message_white@2x.png')}
                onPress={() => {
                }}
            />
        ),
        headerLeft: (
            <NavigationItem
                title='杭州'
                titleStyle={{ color: 'white' }}
                onPress={() => {

                }}
            />
        ),
        headerStyle: { backgroundColor: color.theme },
    })
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Moments')}
                title="Go to notifications"
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
});
