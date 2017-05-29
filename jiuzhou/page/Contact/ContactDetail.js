/**
 * Created by Tong on 2017/5/29.
 */
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
    Button,
    ListView,
    RefreshControl
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
let data=[
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_15.png",name: "Aaron", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_16.png",name: "Bailey", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_17.png",name: "Cady", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_18.png",name: "Dacey", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_10.png",name: "Earl", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png",name: "Faith", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_02.png",name: "Tad", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_04.png",name: "Vail", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_13.png",name: "Vail", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_09.png",name: "Wafa", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_08.png",name: "Yancey", phone: "12345678978",userId: 158},

]

export default class ContactDetail extends Component {
    static navigationOptions = ({ navigation, }) => ({
        headerTitle: (
            <Text>111</Text>
        ),

        headerStyle: { backgroundColor: color.theme,height:50 },
        headerLeft:(
            <TouchableOpacity
                onPress={() => navigation.goBack(null)}
            >
                <Image source={require('../../img/return.png')} style={styles.searchIcon}
                />
            </TouchableOpacity>
        )
    })
    state: Object;
    ds: Object;

    constructor(props: Object) {
        super(props);
        this.state = {
            refreshing: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };

    }
    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }

    onRefresh = async () => {
        // this.setState({
        //     refreshing: true
        // });
        //
        // await profileStore.getOnlineList();
        //
        // this.setState({
        //     refreshing: false
        // });
    };

    _renderRow (rowData) {
        return (
            <View>
                <TouchableOpacity>
                    <View style={styles.root}>
                        <Image style={styles.img} source={{uri: rowData.avatar}} />
                        <View style={styles.content}>
                            <Text style={styles.name}>{rowData.name}</Text>
                        </View>
                        <Image style={{marginLeft: 10,width: 16,height: 16}}
                               source={{uri: 'http://image-2.plusman.cn/app/im-client/arrow.png'}} />
                    </View>
                    <View style={{height:1,backgroundColor:color.white,}}/>
                </TouchableOpacity>

            </View>

        );
    }



    render() {
        return (
            <View style={{flex:1}}>
                {/*<View style={styles.header}>*/}
                    {/*<Text style={styles.title}>通讯录</Text>*/}
                {/*</View>*/}
                {/*/!*搜索框*!/*/}
                {/*<View style={styles.searchcontainer}>*/}
                    {/*<View style={styles.searchBox}>*/}
                        {/*<TextInput*/}
                            {/*underlineColorAndroid='transparent'*/}
                            {/*placeholderTextColor='#bfbfbf'*/}
                            {/*placeholder='搜索昵称'*/}
                            {/*onChangeText={(newText) => this.updateTextInputValueSearchName(newText)}*/}
                            {/*style={styles.inputText}/>*/}
                        {/*<TouchableOpacity*/}
                            {/*onPress={()=>this.searchBook()}*/}
                        {/*>*/}
                            {/*<Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon}*/}
                            {/*/>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                />
            </View>


        );
    }
}
const styles = StyleSheet.create({
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        alignSelf: 'center',
    },
    searchIcon: {
        marginLeft: 10,
        width: 18,
        height: 18
    },
    searchPicture: {
        width: 80,
        height: 80,
        margin: 5,
    },
    // header: {
    //     backgroundColor: color.theme,
    //     paddingBottom: 20
    // },
    icon: {
        width: 27,
        height: 27,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    },
    ItemTextInput:{
        flex:1,
        flexDirection:'row',
        height:44,
        textAlign:'center'
    },
    title: {
        fontSize:16,
        textAlign:'center',
        color:'white',
    },
    header: {
        width:window.width,
        height: 44,
        backgroundColor: color.theme,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    searchBox: {
        borderRadius: 5,  // 设置圆角边
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        height:36,
        flexDirection:'row',
        // textAlign:'center',
        // marginLeft:40

    },
    search: {
        height: 44,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    searchcontainer: {
        width:window.width,
        flexDirection: 'row',   // 水平排布
        height:44,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#ECEDF1',
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    TOUCH: {
        flex: 1,
        //flexDirection: 'row',
        //marginRight:3,
        //marginLeft:3,
        //borderRadius:5,
        // borderColor:'#C0C0C0',
        height:50,
        // backgroundColor: '#F0F8FF',
    },
    rightContainer: {
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        // justifyContent: 'space-between',
    },
    FIRM_NAME: {
        fontSize: 15,
        textAlign: 'center',
        color:color.blue,
    },
    root: {
        flexDirection: 'row',
        backgroundColor: color.White,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    img: {
        height: 25,
        width: 25,
        marginRight: 15
    },
    content: {

    },
    price: {

    },
    name: {
        width: 260,
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
        borderColor: 'white',
    },
    buttonText: {

    },
});
