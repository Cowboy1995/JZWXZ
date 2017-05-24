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
    RefreshControl
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
import RefreshListView from '../../common/RefreshListView';
import RefreshState from '../../common/RefreshState';
import SpacingView from '../../common/SpacingView';
import DetailCell from '../../common/DetailCell';

import {Paragraph,Heading1, Heading2,HeadingBig,Tip} from '../../common/Text';
import NavigationItem from '../../common/NavigationItem';
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
let Book={
    read: "夏日的宁州是一片间杂着无数黛黑和深灰的青绿色大陆，而天空一片淡蓝，仿佛一顶巨大的圆形帷帐，它向四周伸…高的山峰从森林的枷锁中挣脱出来，连成一串闪闪发光的珍珠。 淡青和淡紫色的云烟从浩淼的大陆上升...",
    bookname: "九州铁浮图",
    book: "宁州诸侯的先遣使团，暗夜之主的深藏不露，羽族城主的老谋深算，影者触须的无所不在，蛮族流寇的压境大军，…上，城中不朽的铁塔能否支撑这欲覆的天空？一个构思精巧连锁细密的故事，步步解开这惊心动魄的九连环套。", author: "潘海天，科幻作家，自1994年写作以来，曾五次获得中国科幻银河奖，代表作有《黑暗中归来》、《大角，快…》、《白雀神龟》、《龙渊阁传说》、《厌火》、《七天七夜》、《宝剑炉》、《灭云》、《向北向北向北》。",
};
let picture='http://ac-H1Y1tHCM.clouddn.com/6df75d13deb886f74f04.jpg';
let search='';
// // 获取输入框的内容inputContent   九州铁浮图
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

export default class WikiScene extends Component {
    static navigationOptions = ({ navigation }) => ({
        header:null,
    });

    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
            searchName:'九州缥缈录',
        }
    }

    onHeaderRefresh() {
        this.setState({ isRefreshing: true })

        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000);
    }

    searchBook(){
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 10000);
        let query = new AV.Query('Wiki');
        query.startsWith('bookname', this.state.searchName);
        // 以bookname查询
        query.find().then(function (Wiki) {
            Book=Wiki[0].attributes;
            console.log(Book);
            console.log(Book.picture.attributes.url);
            picture=Book.picture.attributes.url;

        }).catch(function(error) {
            // alert(JSON.stringify(error));
            ToastAndroid.show('搜索不到该书', ToastAndroid.SHORT);
        });

    }
    componentDidMount() {

        let query = new AV.Query('Wiki');
        query.startsWith('bookname', '九州铁浮图');
        // 以bookname查询
        query.find().then(function (Wiki) {
            Book=Wiki[0].attributes;
            console.log(Book);
            console.log(Book.picture.attributes.url);
            picture=Book.picture.attributes.url;
        }).catch(function(error) {
            alert(JSON.stringify(error));
        });

    }
    //监听TextInput中书名的变化
    updateTextInputValueSearchName(newText){
        this.setState({searchName: newText});
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <View style={styles.header}>
                    <Text style={styles.title}>九州百科</Text>
                    <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon}/>
                </View>
                {/*搜索框*/}
                <View style={styles.searchcontainer}>
                    <View style={styles.searchBox}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#bfbfbf'
                            placeholder='搜索书名'
                            onChangeText={(newText) => this.updateTextInputValueSearchName(newText)}
                            style={styles.inputText}/>
                        <TouchableOpacity
                            onPress={()=>this.searchBook()}
                        >
                        <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon}
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {/*标题书名*/}
                    <Text style={{fontSize: 20,}}>{Book.bookname}</Text>
                    <Image source={{uri: picture}} style={styles.searchPicture} />
                    {/*<Image source={Book.picture.attributes.url} style={styles.searchIcon} />*/}

                    <Text style={{fontSize: 20,}}>内容简介</Text>
                    <Text style={{fontSize: 20,}}>{Book.book}</Text>
                    <Text style={{fontSize: 20,}}>作者简介</Text>
                    <Text style={{fontSize: 20,}}>{Book.author}</Text>
                    <Text style={{fontSize: 20,}}>试读</Text>
                    <Text style={{fontSize: 20,}}>{Book.read}</Text>
                    <View>

                    </View>
                    <SpacingView />
                </ScrollView>
            </View>
        );
    }

    // getDataList() {
    //     return (
    //         [
    //             [
    //                 { title: '我的钱包', subtitle: '办信用卡', image: require('../../img/Mine/icon_mine_wallet@2x.png') },
    //                 { title: '余额', subtitle: '￥95872385', image: require('../../img/Mine/icon_mine_balance@2x.png') },
    //                 { title: '抵用券', subtitle: '63', image: require('../../img/Mine/icon_mine_voucher@2x.png') },
    //                 { title: '会员卡', subtitle: '2', image: require('../../img/Mine/icon_mine_membercard@2x.png') }
    //             ],
    //             [
    //                 { title: '好友去哪', image: require('../../img/Mine/icon_mine_friends@2x.png') },
    //                 { title: '我的评价', image: require('../../img/Mine/icon_mine_comment@2x.png') },
    //                 { title: '我的收藏', image: require('../../img/Mine/icon_mine_collection@2x.png') },
    //                 { title: '会员中心', subtitle: 'v15', image: require('../../img/Mine/icon_mine_membercenter@2x.png') },
    //                 { title: '积分商城', subtitle: '好礼已上线', image: require('../../img/Mine/icon_mine_member@2x.png') }
    //             ],
    //             [
    //                 { title: '客服中心', image: require('../../img/Mine/icon_mine_customerService@2x.png') },
    //                 { title: '关于美团', subtitle: '我要合作', image: require('../../img/Mine/icon_mine_aboutmeituan@2x.png') }
    //             ]
    //         ]
    //     )
    // }



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
        backgroundColor: 'red',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight:20,
        marginTop:7

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
        textAlign:'center',
        marginLeft:40

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
});
