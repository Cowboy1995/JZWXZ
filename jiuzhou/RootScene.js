/**
 * Created by Tong on 2017/5/10.
 */
/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

//import liraries
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
import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';
import screen from './common/screen';
import color from './common/color';
import TabBarItem from './common/TabBarItem';

import Login from './page/RegisterLogin/Login';
import Register from './page/RegisterLogin/Register';
import SMSLogin from './page/RegisterLogin/SMSLogin';
import SetPassword from './page/RegisterLogin/SetPassword';

import HomeScene from './page/Home/HomeScene';
import WikiScene from './page/Wiki/WikiScene';
import MomentsScene from './page/Moments/MomentsScene';
import MineScene from './page/Mine/MineScene';


class YinDao extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null,
    });
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TouchableOpacity  onPress={() => navigate('Login')}>
                    <Image
                        source={require('./img/yindao.jpg')}
                        style={styles.yindao}
                    />
                </TouchableOpacity>
                <Image
                    source={require('./img/yindao.jpg')}
                    style={styles.yindao}
                />
            </View>
        )
    }
}



class MyNotificationsScreen extends Component {

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
    yindao: {
        height:screen.height,
        width:screen.width,
    },
});

const MyApp = TabNavigator({
        Wiki: {
            screen: WikiScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '百科',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/pfb_tabbar_discover@2x.png')}
                        selectedImage={require('./img/pfb_tabbar_discover_selected@2x.png')}
                    />
                )
            }),
        },
    Home: {
        screen: HomeScene,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '通讯录',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/pfb_tabbar_order@2x.png')}
                    selectedImage={require('./img/pfb_tabbar_order_selected@2x.png')}
                />
            )
        }),
    },


        Moments: {
            screen: MomentsScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '朋友圈',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/pfb_tabbar_merchant@2x.png')}
                        selectedImage={require('./img/pfb_tabbar_merchant_selected@2x.png')}
                    />
                )
            }),
        },
        Mine: {
            screen: MineScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/pfb_tabbar_mine@2x.png')}
                        selectedImage={require('./img/pfb_tabbar_mine_selected@2x.png')}
                    />
                )
            }),
        },
},    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }
);



const Navigator = StackNavigator(
    {
        MyApp:{ screen:MyApp },
        Home:{ screen:YinDao },
        Login:{ screen:Login },
        Register:{ screen:Register },
        SMSLogin:{ screen:SMSLogin },
        SetPassword:{ screen:SetPassword },

        // Tab: { screen: Tab },

    },
{
    navigationOptions: {
        // headerStyle: { backgroundColor: color.theme }
        headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
    },
}

);

const prevGetStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
    // Do not allow to go back from Login
    if (action.type === "Navigation/BACK" && state && state.routes[state.index].routeName === "Login") {
        return null;
    }
    if (action.type === "Navigation/BACK" && state && state.routes[state.index].routeName === "MyApp") {
        return null;
    }
    // Do not allow to go back to Login
    // if (action.type === "Navigation/BACK" && state) {
    //     const newRoutes = state.routes.filter(r => r.routeName !== "Login");
    //     const newIndex = newRoutes.length - 1;
    //     return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
    // }
    //

    return prevGetStateForAction(action, state);
};
//make this component available to the app
export default Navigator;
