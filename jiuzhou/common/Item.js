/**
 * Created by Tong on 2017/5/26.
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
    Button,
    ListView,
    ScrollView,
    RefreshControl
}from 'react-native';
export default class Item extends Component {
    render() {
        const { index, data } = this.props;
        return (
            <View style={styles.root}>
                <Image style={styles.img} source={{uri: data.attributes.picture.attributes.url}} />
                <View style={styles.content}>
                    <Text style={styles.name}>{data.attributes.bookname}</Text>
                    <View style={styles.priceAndControls}>
                        {/*<Text style={styles.price}>￥{price.toFixed(2)}</Text>*/}

                        <Text>{data.attributes.bookname}</Text>

                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 100,
    },
    img: {
        width: 90,
        height: 90,
    },
    content: {

    },
    price: {

    },
    name: {
        width: 180,
        fontSize: 16,
    },
    priceAndControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000',
    },
    buttonText: {

    },
});
