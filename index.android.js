/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    CameraRoll,
    StatusBar} from 'react-native';

import RootScene from './src/RootScene';
import Navigator from './jiuzhou/RootScene';

import { AsyncStorage } from 'react-native';
import Storage from "react-native-storage";
let storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
});

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
global.Tong = storage;

// 这样，在此**之后**的任意位置即可以直接调用Tong
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.Tong = storage语句是否确实已经执行过了

import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
console.disableYellowBox = true;
if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}
// export default class MeiTuan extends Component {
//     render() {
//         return (
//             <RootScene />
//         );
//     }
// }
// AppRegistry.registerComponent('MeiTuan', () => MeiTuan);
var fetchParams = {
    first: 6,
    assetType: 'Photos'
}

//默认应用的容器组件
class App extends Component {
    render(){
        return(
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor='#06C1AE' />
                <Navigator />
            </View>
        )
    }
}



//样式定义
const styles = StyleSheet.create({
    flex:{
        flex:1
    },
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems:'center'
    },
    row:{
        flexDirection: 'row'
    },
    image:{
        height: 120,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    },
});
AppRegistry.registerComponent('MeiTuan', () => App);

// AppRegistry.registerComponent('MeiTuan', () => Navigator);
