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
                icon={require('../../img/Home/icon_navigationItem_message_white@2x.png')}
                onPress={() => {
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
            isRefreshing: false
        }
    }

    onHeaderRefresh() {
        this.setState({ isRefreshing: true })

        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000);
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <View style={{ position: 'absolute', width: screen.width, height: screen.height, backgroundColor: color.background }} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {/*标题书名*/}
                    <Text style={{fontSize: 20,}}>九州缥缈录</Text>
                    <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon} />
                    <Text style={{fontSize: 20,}}>内容简介</Text>
                    <Text style={{fontSize: 20,}}>当这个世界都要崩溃；当星辰和阳光也熄灭，当马蹄踏过弱者的尸骨，当黑暗的血色吞噬人心，不死的鹰再次降落在草原，英雄还在哭泣，在铁铸的摇篮中成长……《九州·缥缈录》的故事就发生在这里，游牧部落内部的权力争夺激烈，青阳与东陆王朝间恩怨重重。这是乱世的英雄史诗，当古老的王朝日渐衰微，掌管着星辰命运的神秘宗教走入了政治斗争的漩涡，年轻的王朝继承者崭露出耀眼的锋芒。</Text>
                    <Text style={{fontSize: 20,}}>作者简介</Text>
                    <Text style={{fontSize: 20,}}>江南，男，安徽合肥人。目前的身份是作者，以及媒体经理。代表作品有《此间的少年》、《一千零一夜之死神》、《九州·缥缈录》系列、《光明皇帝》系列等。</Text>
                    <Text style={{fontSize: 20,}}>目录</Text>
                    <Text style={{fontSize: 20,}}>第一章 蛮荒  第二章 动陆密使 第三章 世子 第四章 青铜之血 第五章 斩狼</Text>
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
        borderColor: '#51D3C6'
    }
});
