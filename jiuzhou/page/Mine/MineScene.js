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
    ScrollView,
    RefreshControl,
    StatusBar,
    PixelRatio
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
import RefreshListView from '../../common/RefreshListView';
import RefreshState from '../../common/RefreshState';
import SpacingView from '../../common/SpacingView';
import DetailCell from '../../common/DetailCell';

import {Paragraph,Heading1, Heading2,} from '../../common/Text';
import NavigationItem from '../../common/NavigationItem';
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
// // 获取输入框的内容inputContent
// let inputContent = "他妈的tmdfuckk";
//
// // 多个敏感词，这里直接以数组的形式展示出来
// let arrMg = ["fuck", "tmd", "他妈的"];
//
// // 显示的内容--showContent
// let showContent = inputContent;
//
// // 正则表达式
// // \d 匹配数字
//
// for (let i = 0; i < arrMg.length; i++) {
//
//     // 创建一个正则表达式
//     let r = new RegExp(arrMg[i], "ig");
//
//     showContent = showContent.replace(r, "*");
// }
// // 显示的内容--showInput
// console.log(showContent);
let data=[];
let avatar=[];
let tag=true;
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
                icon={require('../../img/set.png')}
                onPress={() => {
                    navigation.navigate('UserSet',{data:data,tag:tag})
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
    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
            avatar:''
        }
    }

    componentDidMount(){
        this.setState({ isRefreshing: true });
        // setTimeout(() => {
        //     this.setState({ isRefreshing: false })
        // }, 3000);
        Tong.load({
            key:'User',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            data=ret.detail;
            avatar=data.avatar.url;
            console.log(data);
            this.setState({
                isRefreshing: false,
                avatar:avatar
            })
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }

    onHeaderRefresh() {
        this.setState({ isRefreshing: true });
        // setTimeout(() => {
        //     this.setState({ isRefreshing: false })
        // }, 1000);
        Tong.load({
            key:'User',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            let id=ret.id;
            console.log(id);
            let query = new AV.Query('_User');
            query.equalTo('objectId', id);
            query.first().then(function (result) {
                console.log(result.attributes);
                data=result.attributes;
                avatar=data.avatar.attributes.url;
                tag=false;
                this.setState({
                    avatar:avatar,
                    isRefreshing: false,
                })
            })

        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });


    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{ flex: 1 }}>
                {cells}
            </View>
        )
    }

    renderHeader() {
        const { navigate } = this.props.navigation;

        return (

            <View style={styles.header}>

                <View style={styles.userContainer}>
                    <Image style={styles.avatar} source={{uri: this.state.avatar}} />
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Heading1 style={{ color: 'white' }}>{data.username}</Heading1>
                            <Image style={{ marginLeft: 4 }} source={require('../../img/Mine/beauty_technician_v15@2x.png')} />
                        </View>
                        <TouchableOpacity onPress={()=>navigate('MyDetail',{data:data,tag:tag})}>
                            <Paragraph style={{ color: 'white', marginTop: 4 }}>个人信息 ></Paragraph>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        let colors = ['#F4000B', '#17B4FF', '#FFD900','#666666','#1EA114'];
        let tags = ['C', 'A',  'W','M'];
        let items = ['修改密码', '添加好友',  '我的百科','个人相册'];
        let components = ['SetPassword','AddFriend', 'MyWiki', 'DeatailMoments',''];
        let JSXDOM = [];
        for(let i in items){
            JSXDOM.push(
                <TouchableOpacity key={items[i]} onPress={()=>navigate(components[i])}>
                    {/*<View style={{height:1,backgroundColor:'#ddd',}}/>*/}

                    <View style={[styles.item, {flexDirection:'row',marginTop:10}]}>
                        <Text style={[styles.tag, {color: colors[i]}]}>{tags[i]}</Text>
                        <Text style={[styles.font,{flex:1}]}>{items[i]}</Text>
                        <Image style={{marginRight: 10,width: 16,height: 16}}
                               source={{uri: 'http://image-2.plusman.cn/app/im-client/arrow.png'}} />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <View style={{ position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: color.background }} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.state.isRefreshing?null:this.renderHeader()
                    }
                    {this.state.isRefreshing?null:
                        <View>
                            <View style={styles.wrapper}>
                                {JSXDOM}
                            </View>
                            <View style={{marginTop:30}}>
                                <TouchableOpacity onPress={()=>{
                            AV.User.logOut();
                            ToastAndroid.show('退出成功', ToastAndroid.SHORT);

                            navigate('YinDao')
                        }}>
                                    <View style={[styles.item, {flexDirection:'row'}]}>
                                        <Text style={[styles.tag, {color: colors[4]}]}>Q</Text>
                                        <Text style={[styles.font,{flex:1}]}>退出登录</Text>
                                        <Image style={{marginRight: 10,width: 16,height: 16}}
                                               source={{uri: 'http://image-2.plusman.cn/app/im-client/arrow.png'}} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                </ScrollView>
            </View>
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
    },
    header: {
        backgroundColor: color.theme,
        paddingBottom: 20
    },
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
        borderColor: '#51D3C6',

    },
    // container:{
    //     flex:1,
    //     backgroundColor:'#F5F5F5',
    // },
    item:{
        height:44,
        justifyContent: 'center',
        // borderTopWidth: Util.pixel,
        borderTopColor: '#ddd',
        backgroundColor:'#fff',
        alignItems:'center',
    },
    font:{
        fontSize:15,
        marginLeft:10,
        marginRight:10,
    },
    wrapper:{
    },
    tag:{
        marginLeft:10,
        fontSize:16,
        fontWeight:'bold'
    }
});
