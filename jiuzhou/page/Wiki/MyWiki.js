/**
 * Created by Tong on 2017/5/26.
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



export default class MyWiki extends Component {
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
        Tong.load({
            key:'User',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            console.log(ret.id);
            let query = new AV.Query('Wiki');
            query.startsWith('ids', ret.id);
            // query.contains('ids',ret.id);
            // query.include('owner');
            // query.include('picture');
            // query.descending('createdAt');
            query.find().then(function (products) {
                console.log(products);
                // 查询到商品后，在前端展示到相应的位置中。
            }).catch(function(error) {
                alert(JSON.stringify(error));
            });
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


        // let query = new AV.Query('Wiki');
        // query.startsWith('bookname', '九州铁浮图');
        // // 以bookname查询
        // query.find().then(function (Wiki) {
        //     Book=Wiki[0].attributes;
        //     console.log(Book);
        //     console.log(Book.picture.attributes.url);
        //     picture=Book.picture.attributes.url;
        // }).catch(function(error) {
        //     alert(JSON.stringify(error));
        // });

    }
    //监听TextInput中书名的变化
    updateTextInputValueSearchName(newText){
        this.setState({searchName: newText});
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <View style={styles.header}>
                    <Text style={styles.title}>九州百科</Text>
                    <TouchableOpacity
                        onPress={() => navigate('NewWiki')}
                    >
                        <Image source={require('../../img/xinjian.png')} style={styles.searchIcon}
                        />
                    </TouchableOpacity>
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
                    <SpacingView />
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
