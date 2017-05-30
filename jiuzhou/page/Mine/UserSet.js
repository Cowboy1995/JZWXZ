/**
 * Created by Tong on 2017/5/30.
 */
/**
 * Created by Tong on 2017/5/24.
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
    Platform,
}from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';

import RefreshListView from '../../common/RefreshListView';
import RefreshState from '../../common/RefreshState';
import SpacingView from '../../common/SpacingView';
import DetailCell from '../../common/DetailCell';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import ImagePicker from 'react-native-image-picker';
import {Paragraph,Heading1, Heading2,HeadingBig,Tip} from '../../common/Text';
import NavigationItem from '../../common/NavigationItem';
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
let file={};
export default class UserSet extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <Text style={{color:'white',fontSize:16,marginLeft:10}}>个人设置</Text>
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

    state: {
        isRefreshing: boolean
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
            bookname:'',
            book:'',
            author:'',
            read:'',
            owner:'',
            id:'',
            images: [],
        }
    }

    onHeaderRefresh() {
        this.setState({ isRefreshing: true })

        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000);
    }
    //
    //
    submit(){
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 10000);

        let Wiki = AV.Object.extend('Wiki');
        // AV.Object.extend('className') 所需的参数 className 则表示对应的表名
        // 声明一个类型
        let wiki = new Wiki();
        // 新建对象
        let name = file.fileName;
        let avFile = new AV.File(name,  {
            blob: {
                uri: file.uri,
            },
        });
        console.log(avFile);
        wiki.set('bookname', this.state.bookname);
        // 设置书名
        wiki.set('book', this.state.book);
        // 设置内容简介
        wiki.set('author', this.state.author);
        // 设置作者简介
        wiki.set('owner', AV.User.currentAsync());
        // // 设置百科创建者
        wiki.set('ids', this.state.id);
        // // 设置百科创建者
        wiki.set('read', this.state.read);
        // 设置试读
        wiki.set('picture', avFile);
        wiki.save().then(function() {
            ToastAndroid.show('上传成功', ToastAndroid.SHORT);
            // 保存成功
        }, function(error) {
            alert(JSON.stringify(error));
            //保存失败
            // alert(error)
        });

    }
    // //监听TextInput中书名的变化
    updateTextInputValuebookname(newText){
        this.setState({bookname: newText});
    }
    updateTextInputValuebook(newText){
        this.setState({book: newText});
    }
    updateTextInputValueauthor(newText){
        this.setState({author: newText});
    }
    updateTextInputValueread(newText){
        this.setState({read: newText});
    }
    componentDidMount() {
        Tong.load({
            key:'User',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            this.setState({id:ret.id});
            console.log(ret.id);
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
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
    selectPhotoTapped() {
        // CameraRoll.getPhotos({
        //     first: 1
        // }, (data) => {
        //     var edge = data.edges[0];
        //     var image = edge.node.image;
        //     var file = new AV.File('image.jpg', {
        //         blob: image
        //     });
        //     file.save()
        //         .then(
        //             () => console.log('图片上传成功'),
        //             (err) => console.log('图片上传失败', err)
        //         );
        // }, console.log);
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            file=response;
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source;

                // You can display the image using either:
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                //Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }

                this.setState({
                    avatarSource: source,
                    IMAGE:response.data,
                });
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    <View style={[styles.item, {flexDirection:'row',}]}>
                        <Text style={[styles.font,{flex:1}]}>{'头像'}</Text>
                        <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',backgroundColor:color.littlegray,
                                 marginRight:10,height:60,width:60,borderRadius:1}}
                                          onPress={this.selectPhotoTapped.bind(this)}>
                            <Image source={require('../../img/picture.png')} style={{height:30,width:30,resizeMode: 'stretch',}}/>
                            <Text style={{color:'#666666',fontSize: 12,marginTop:5}}>{"添加图片"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:2,backgroundColor:color.background}}/>


                    <Text style={{fontSize: 15,margin:10,}}>昵称</Text>
                    <AutoGrowingTextInput
                        underlineColorAndroid='#666666'
                        style={styles.textInput}
                        placeholder={'请输入昵称'}
                        placeholderTextColor='#bfbfbf'
                        maxHeight={200}
                        onChangeText={(newText) => this.updateTextInputValuebookname(newText)}

                    />


                    <Text style={{fontSize: 15,margin:10,}}>标签</Text>
                    <AutoGrowingTextInput
                        underlineColorAndroid='#666666'
                        placeholderTextColor='#bfbfbf'
                        style={styles.textInput}
                        placeholder={'请输入标签'}
                        maxHeight={200}
                        onChangeText={(newText) => this.updateTextInputValuebookname(newText)}

                    />

                    <Text style={{fontSize: 15,margin:10,}}>电话</Text>

                    <AutoGrowingTextInput
                        underlineColorAndroid='#666666'
                        placeholderTextColor='#bfbfbf'
                        style={styles.textInput}
                        placeholder={'请输入电话'}
                        maxHeight={200}
                        onChangeText={(newText) => this.updateTextInputValueread(newText)}

                    />

                    <Text style={{fontSize: 15,margin:10,}}>地区</Text>
                    <AutoGrowingTextInput
                        underlineColorAndroid='#666666'
                        placeholderTextColor='#bfbfbf'
                        style={styles.textInput}
                        placeholder={'请输入地区'}
                        maxHeight={200}
                        onChangeText={(newText) => this.updateTextInputValuebook(newText)}

                    />

                    <View style={[styles.item, {flexDirection:'row',}]}>
                        <Text style={[styles.font,{flex:1}]}>{'相册'}</Text>
                        <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',backgroundColor:color.littlegray,
                                 marginRight:10,height:60,width:60,borderRadius:1}}
                                          onPress={this.selectPhotoTapped.bind(this)}>
                            <Image source={require('../../img/picture.png')} style={{height:30,width:30,resizeMode: 'stretch',}}/>
                            <Text style={{color:'#666666',fontSize: 12,marginTop:5}}>{"添加图片"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:2,backgroundColor:color.border}}/>

                    <View style={styles.ItemViewButtom}>
                        <TouchableOpacity style={styles.loginView} onPress={()=>this.submit()} >
                            <Text style={styles.loginbutton}>{"提交"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:100,backgroundColor: 'white'}}/>
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
    item:{
        height:80,
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
    },
    searchIcon: {
        marginLeft: 8,
        width: 27,
        height: 27

    },
    loginbutton:{
        fontSize: 15,
        color: 'white',

    },
    loginView:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#06C1AE',
        marginTop:30,
        height:44,
        width:screen.width-20,
        borderRadius:5,

    },
    ItemViewButtom:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor: 'white',
        marginTop:10,
    },
});
