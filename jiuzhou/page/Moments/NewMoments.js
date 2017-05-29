/**
 * Created by Tong on 2017/5/30.
 */
/**
 * Created by Tong on 2017/5/30.
 */
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
    RefreshControl,
    ScrollView
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

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

export default class NewMoments extends Component {
    static navigationOptions = ({ navigation, }) => ({

        headerStyle: { backgroundColor: color.theme,height:50 },
        headerLeft:(
            <TouchableOpacity
                onPress={() => navigation.goBack(null)}
            >
                <Image source={require('../../img/return.png')} style={styles.searchIcon}
                />
            </TouchableOpacity>
        ),
        headerRight:(
            <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',backgroundColor:color.LightBlack,
            marginRight:5,height:30,width:60,borderRadius:1}}>
                <Text style={{color:'white'}}>{"发送"}</Text>
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

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <View style={{height:150,backgroundColor:'white'}}>
                    <AutoGrowingTextInput
                        underlineColorAndroid='transparent'
                        style={styles.textInput}
                        placeholderTextColor='#bfbfbf'
                        placeholder={'这一刻的想法...'}
                        maxHeight={200}
                    />
                </View>
                <View style={{height:100,width:100,marginTop:10,marginLeft:10,backgroundColor:'white'}}>

                </View>
                <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',backgroundColor:color.LightBlack,
            marginLeft:10,marginTop:10,height:40,width:80,borderRadius:1}}>
                    <Text style={{color:'white'}}>{"添加图片"}</Text>
                </TouchableOpacity>
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
    textInput: {
        flex: 1,
        padding: 4,
        height: 100,
        fontSize: 14,
        backgroundColor:'white',
        marginLeft:10,

    }
});
