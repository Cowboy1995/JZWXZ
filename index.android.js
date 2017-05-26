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
    CameraRoll, } from 'react-native';

import RootScene from './src/RootScene';
import Navigator from './jiuzhou/RootScene';
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
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            photos: null,
            image: null
        };
    }

    //页面的组件渲染完毕（render）之后执行
    componentDidMount() {
        var _that = this;
        //获取照片
        var promise = CameraRoll.getPhotos(fetchParams)
        promise.then(function(data){
            var edges = data.edges;
            var photos = [];
            var image = [];

            for (var i in edges) {
                photos.push(edges[i].node.image.uri);
                image.push(edges[i].node.image);
                console.log(image[0]);
                console.log(edges[0].node.image)

            }
            _that.setState({
                photos:photos,
                image:image[0],
            });
        },function(err){
            alert('获取照片失败！');
        });
        var file = new AV.File('image.jpg', {
            blob: image
        });
        file.save()
            .then(
                () => console.log('图片上传成功'),
                (err) => console.log('图片上传失败', err)
            );
    }

    //渲染
    render() {

        var photos = this.state.photos || [];
        var photosView = [];
        for(var i = 0; i < 6 ; i += 2){
            photosView.push(
                <View key={i} style={styles.row}>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:photos[i]}}/>
                    </View>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:photos[i+1]}}/>
                    </View>
                </View>
            )
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    {photosView}
                </View>
            </ScrollView>
        );
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
// AppRegistry.registerComponent('MeiTuan', () => App);

AppRegistry.registerComponent('MeiTuan', () => Navigator);
