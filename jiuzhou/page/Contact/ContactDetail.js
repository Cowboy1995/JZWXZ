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
let date=[
    {area:'浙江    宁波',biaoqian:'高中同学',avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_15.png",name: "Aaron",nickname:"Aaaa", phone: "12345678978",userId: 158},
    {avatar: "http://image-2.plusman.cn/app/im-client/avatar/tuzki_16.png",name: "Bailey",nickname:"Bbbb", phone: "12345678978",userId: 158},
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
let data=[];
let avatar='';
let album='';

export default class ContactDetail extends Component {
    static navigationOptions = ({ navigation, }) => ({
        headerTitle: (
            <Text style={{color:'white',fontSize:16,marginLeft:10}}>详细资料</Text>
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
        };

    }
    componentDidMount(){
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 3000);
        const { state } = this.props.navigation;
        console.log(state.params.data);
        data=state.params.data;
        avatar=data.avatar.url;
        album=data.album.url;

        console.log(avatar);

        console.log(album);

        // Tong.load({
        //     key:'contact',
        //     autoSync: true,
        //     syncInBackground: true
        // }).then(ret => {
        //     console.log(ret.date);
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(ret.date),
        //         navigate:navigate,
        //     });
        //
        // }).catch(err => {
        //     console.warn(err.message);
        //     switch (err.name) {
        //         case 'NotFoundError':
        //             // TODO;
        //             break;
        //         case 'ExpiredError':
        //             // TODO
        //             break;
        //     }
        // });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex:1}}>


                <View style={{height:20,backgroundColor:color.gray}}/>
                    <View style={styles.root}>
                        <Image style={styles.img} source={{uri: avatar}} />
                        <View style={styles.content}>
                            <Text style={styles.name}>{data.username}</Text>
                            <View style={styles.priceAndControls}>
                                {/*<Text style={styles.price}>￥{price.toFixed(2)}</Text>*/}
                                <Text style={{fontSize:14,color:color.littlegray}}>{'昵称：'+data.nickname}</Text>
                            </View>
                        </View>
                    <View style={{height:1,backgroundColor:color.white,}}/>
                    </View>

                <View style={{height:20,backgroundColor:color.gray}}/>
                <View style={{height:40,backgroundColor:'white',alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,}}>
                    <Text style={{textAlign:'center',}}>标签</Text>
                    <Text style={{fontSize:14,color:color.littlegray,marginLeft:55}}>{data.tag}</Text>
                </View>

                <View style={{height:20,backgroundColor:color.gray}}/>
                <View style={{height:40,backgroundColor:'white',alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,}}>
                    <Text style={{textAlign:'center',}}>电话</Text>
                    <Text style={{fontSize:14,color:color.littlegray,marginLeft:55}}>{data.mobilePhoneNumber}</Text>
                </View>

                <View style={{height:20,backgroundColor:color.gray}}/>
                <View style={{height:40,backgroundColor:'white',alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,}}>
                    <Text style={{textAlign:'center',}}>地区</Text>
                    <Text style={{fontSize:14,color:color.littlegray,marginLeft:55}}>{data.area}</Text>
                </View>

                <View style={{height:1,backgroundColor:color.gray}}/>
                <View style={{height:80,backgroundColor:'white',alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,}}>
                    <Text style={{textAlign:'center',}}>个人相册</Text>
                    <Image style={styles.img1} source={{uri: album}} />
                </View>

                <View style={{height:1,backgroundColor:color.gray}}/>
                <View style={{height:40,backgroundColor:'white',alignItems: 'center',flexDirection: 'row',
                paddingHorizontal: 15,paddingVertical: 10,}}>
                    <Text style={{textAlign:'center',}}>更多</Text>
                </View>
                <View style={styles.ItemViewButtom}>
                    <TouchableOpacity style={styles.loginView1} onPress={()=>{
                        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
                        this.props.navigation.goBack(null)

                    }}>
                        <Text style={{color:'white'}}>{"删除好友"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ItemViewButtom}>
                    <TouchableOpacity style={styles.loginView} onPress={()=>navigate('DeatailMoments')}>
                        <Text style={{color:'white'}}>{"查看朋友圈"}</Text>
                    </TouchableOpacity>
                </View>

            </View>


        );
    }
}
const styles = StyleSheet.create({
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
        height:80
    },
    img: {
        height: 60,
        width: 60,
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
        width: 240,
        fontSize: 16,
        marginBottom:15,
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
    loginView1:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#999999',
        marginTop:15,
        height:44,
        width:screen.width-20,
        borderRadius:5,
    },
    ItemViewButtom1:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#ECEDF1',
        marginTop:10,
    },
});
