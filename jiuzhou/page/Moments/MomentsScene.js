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
    RefreshControl,
    ScrollView
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
let data=[
    {time:'Thu May 25 2017 01:38:45 ',area:'浙江    宁波',biaoqian:'高中同学',avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_15.png",name: "Aaron",nickname:"Aaaa", phone: "12345678978",userId: 158},
    {time:'Thu May 24 2017 11:25:59 ',avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_16.png",name: "Bailey",nickname:"Bbbb", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_17.png",name: "Cady",nickname:"Aaaa", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_18.png",name: "Dacey", nickname:"Aaaa",phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_10.png",name: "Earl", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_14.png",name: "Faith", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_02.png",name: "Tad", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_04.png",name: "Vail", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_13.png",name: "Vail", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_09.png",name: "Wafa", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_08.png",name: "Yancey", phone: "12345678978",userId: 158},

]

export default class MomentsScene extends Component {
    static navigationOptions = ({ navigation, }) => ({
        header:null,
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

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.title}>朋友圈</Text>
                    <Image source={require('../../img/xinjian.png')} style={{marginRight:10,marginTop:1,height:25,width:25,}}
                    />
                </View>
                <ScrollView >
                    <View style={{flex:1,backgroundColor:'white'}}>
                        <View style={{height:20,backgroundColor:color.gray}}/>
                        <View style={styles.root}>
                            <Image style={styles.img} source={{uri: data[1].avatar}} />
                            <View style={styles.content}>
                                <Text style={styles.name}>{data[1].nickname}</Text>
                                <View style={styles.priceAndControls}>
                                    {/*<Text style={styles.price}>￥{price.toFixed(2)}</Text>*/}
                                    <Text style={{fontSize:12,color:color.littlegray}}>{data[0].time}</Text>
                                </View>
                            </View>
                            <View style={{height:1,backgroundColor:color.white,}}/>
                        </View>
                        {/*<Image style={styles.img1} source={require('../../img/s1.jpg')} />*/}

                        <Image source={{uri: 'http://ac-H1Y1tHCM.clouddn.com/6df75d13deb886f74f04.jpg'}} style={{marginLeft:63,marginTop:10,height:200,width:150,resizeMode: 'stretch',
}}
                        />
                        <Image source={require('../../img/message.png')} style={{marginLeft:screen.width-35,marginTop:10,height:25,width:25,}}
                        />
                        <View style={{height:40,backgroundColor:color.LittleGrey,alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,marginLeft:63,marginRight:13,marginTop:5}}>
                            <Text style={{fontSize:13,color:color.ziti}}>{data[0].nickname+':'}</Text>
                            <Text style={{fontSize:13,}}>{'九州铁浮图真好看！'}</Text>
                        </View>
                        <View style={{height:0.5,backgroundColor:color.littlegray,marginTop:10}}/>

                        <View style={{height:20,backgroundColor:color.gray}}/>
                        <View style={styles.root}>
                            <Image style={styles.img} source={{uri: data[0].avatar}} />
                            <View style={styles.content}>
                                <Text style={styles.name}>{data[0].nickname}</Text>
                                <View style={styles.priceAndControls}>
                                    {/*<Text style={styles.price}>￥{price.toFixed(2)}</Text>*/}
                                    <Text style={{fontSize:12,color:color.littlegray}}>{data[1].time}</Text>
                                </View>
                            </View>
                            <View style={{height:1,backgroundColor:color.white,}}/>
                        </View>
                        {/*<Image style={styles.img1} source={require('../../img/s1.jpg')} />*/}

                        <Image source={{uri: 'http://ac-h1y1thcm.clouddn.com/d48468017ebf5dbcba42.jpg'}} style={{marginLeft:63,marginTop:10,height:200,width:150,resizeMode: 'stretch',}}
                        />
                        <Image source={require('../../img/message.png')} style={{marginLeft:screen.width-35,marginTop:10,height:25,width:25,}}
                        />
                        <View style={{height:40,backgroundColor:color.LittleGrey,alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,marginLeft:63,marginRight:13,marginTop:5}}>
                            <Text style={{fontSize:13,color:color.ziti}}>{data[1].nickname+':'}</Text>
                            <Text style={{fontSize:13,}}>{'今天看完了九州缥缈录'}</Text>
                        </View>
                        <View style={{height:0.5,backgroundColor:color.littlegray,marginTop:10}}/>
                    </View>
                </ScrollView>
            </View>





        );
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize:18,
        textAlign:'center',
        color:'white',
        marginLeft:screen.width/2-28,
    },
    header: {
        width:window.width,
        height: 44,
        backgroundColor: color.theme,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    searchIcon: {
        marginLeft: 8,
        width: 27,
        height: 27
    },
    root: {
        flexDirection: 'row',
        backgroundColor: color.White,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height:40
    },
    img: {
        height: 30,
        width: 30,
        marginRight: 15
    },
    img1: {
        height: 60,
        width: 60,
        marginLeft: 30
    },
    content: {

    },
    price: {

    },
    name: {
        width: 280,
        fontSize: 14,
        color:color.ziti
    },
    ItemViewButtom:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#ECEDF1',
        marginTop:15,
    },
    loginView:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#06C1AE',
        marginTop:15,
        height:44,
        width:screen.width-20,
        borderRadius:5,
    },
    ItemViewButtom:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#ECEDF1',
        marginTop:10,
    },
});
