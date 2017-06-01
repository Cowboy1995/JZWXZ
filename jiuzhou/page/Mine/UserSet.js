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
let file1={};

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
            nickname:'',
            tag:'',
            area:'',
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
        // this.setState({ isRefreshing: true });
        // setTimeout(() => {
        //     this.setState({ isRefreshing: false })
        // }, 10000);
        const  navigation = this.props.navigation;
        Tong.load({
            key:'User',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            let id=ret.id;
            let avFile = new AV.File(file.fileName,  {
                blob: {
                    uri: file.uri,
                },
            });
            let avFile1 = new AV.File(file1.fileName,  {
                blob: {
                    uri: file1.uri,
                },
            });
            let todo = AV.Object.createWithoutData('_User', id);
            todo.set('nickname', this.state.nickname);
            todo.set('tag', this.state.tag);
            todo.set('area', this.state.area);
            todo.set('avatar', avFile);
            todo.set('album', avFile1);
            todo.save().then(function() {
                ToastAndroid.show('上传成功', ToastAndroid.SHORT);
                navigation.goBack(null);
                // 保存成功
            }, function(error) {
                alert(JSON.stringify(error));
                //保存失败
                // alert(error)
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
    }

    componentDidMount() {
        Tong.load({
            key:'User',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            this.setState({id:ret.id});
            console.log(ret.id);
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
    selectPhotoTapped1() {
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
            file1=response;
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
                    avatarSource1: source,
                    IMAGE1:response.data,
                });
            }
        });
    }
    selectPhotoTapped() {
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
    // //监听TextInput中书名的变化
    updateTextInputValueNickName(newText){
        this.setState({nickname: newText});
    }
    updateTextInputValueTag(newText){
        this.setState({tag: newText});
    }
    updateTextInputValueArea(newText){
        this.setState({area: newText});
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
                        onChangeText={(newText) => this.updateTextInputValueNickName(newText)}

                    />


                    <Text style={{fontSize: 15,margin:10,}}>标签</Text>
                    <AutoGrowingTextInput
                        underlineColorAndroid='#666666'
                        placeholderTextColor='#bfbfbf'
                        style={styles.textInput}
                        placeholder={'请输入标签'}
                        maxHeight={200}
                        onChangeText={(newText) => this.updateTextInputValueTag(newText)}

                    />
                    {/*<Text style={{fontSize: 15,margin:10,}}>电话</Text>*/}

                    {/*<AutoGrowingTextInput*/}
                        {/*underlineColorAndroid='#666666'*/}
                        {/*placeholderTextColor='#bfbfbf'*/}
                        {/*style={styles.textInput}*/}
                        {/*placeholder={'请输入电话'}*/}
                        {/*maxHeight={200}*/}
                        {/*onChangeText={(newText) => this.updateTextInputValuephone(newText)}*/}

                    {/*/>*/}

                    <Text style={{fontSize: 15,margin:10,}}>地区</Text>
                    <AutoGrowingTextInput
                        underlineColorAndroid='#666666'
                        placeholderTextColor='#bfbfbf'
                        style={styles.textInput}
                        placeholder={'请输入地区'}
                        maxHeight={200}
                        onChangeText={(newText) => this.updateTextInputValueArea(newText)}

                    />

                    <View style={[styles.item, {flexDirection:'row',}]}>
                        <Text style={[styles.font,{flex:1}]}>{'相册'}</Text>
                        <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center',backgroundColor:color.littlegray,
                                 marginRight:10,height:60,width:60,borderRadius:1}}
                                          onPress={this.selectPhotoTapped1.bind(this)}>
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
