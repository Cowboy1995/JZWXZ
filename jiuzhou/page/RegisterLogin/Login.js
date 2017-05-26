/**
 * Created by Tong on 2017/5/10.
 */
/**
 * Created by 1 on 2016/11/17.
 */
/**
 * Created by 1 on 2016/10/21.
 * 登陆界面
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
    CameraRoll,
}from 'react-native';
let {width} = Dimensions.get('window');
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);


export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            disabled: false,
            // USERNAME:'',
            // PASSWORD:'',
            USERNAME:'qwe',
            PASSWORD:'123456',
            login:false,
        };
    }

    //登录按钮跳转到主页面
    JumpMainScreen=()=> {
        const { navigate } = this.props.navigation;
        // navigate('MyApp');
        if(this.state.USERNAME.length===0){
            ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
            //判断用户名是否为空，为空提示用户输入用户名
        }else if(this.state.PASSWORD.length===0){
            ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
            //判断密码是否为空，为空提示用户输入密码
        }else {
            AV.User.logIn(this.state.USERNAME, this.state.PASSWORD).then(function (loginedUser) {
                //调用AV.User.logIn方法进行帐号密码登陆
                navigate('MyApp');
                //登陆成功跳转到主页面
                ToastAndroid.show('登录成功', ToastAndroid.SHORT);
            }, function (error) {
                ToastAndroid.show('用户名密码错误', ToastAndroid.SHORT);
                //登陆失败返回帐号或密码错误
            });
        }
    };

    //监听TextInput中用户名的变化
    updateTextInputValueUSERNAME(newText){
        this.setState({USERNAME: newText});
    }
    //监听TextInput中密码的变化
    updateTextInputValuePASSWORD(newText){
        this.setState({PASSWORD: newText});
    }


    static navigationOptions = ({ navigation }) => ({
        header:null,
    });

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {/*标题*/}
                <View style={styles.title}>
                    <Text style={{color:'white',fontSize:16}}>九州妄想者</Text>
                </View>
                {/*右上角短信登录*/}
                <TouchableOpacity style={styles.buttonTopView} onPress={() => navigate('SMSLogin')}>
                    <Text style={styles.button}>{"短信登录"}</Text>
                </TouchableOpacity>

                {/*输入用户名*/}
                <View style={styles.ItemView}>
                    {/*<Image source={require('../../images/header/icon_user.png')} style={styles.userImage}/>*/}
                    <View style={styles.Box1}>
                        <TextInput
                            style={styles.ItemTextInput}
                            underlineColorAndroid='transparent'
                            placeholder= "请输入用户名"
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(newText) => this.updateTextInputValueUSERNAME(newText)}
                        />
                    </View>
                </View>
                <View style={styles.dividerview}>
                    <Text style={styles.divider}/>
                </View>
                {/*输入密码*/}
                <View style={styles.ItemView}>
                    {/*<Image source={require('../../images/header/icon_password.png')} style={styles.userImage}/>*/}
                    <View style={styles.Box1}>
                        <TextInput
                            style={styles.ItemTextInput}
                            placeholder= "请输入密码"
                            placeholderTextColor='#bfbfbf'
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={(newText) => this.updateTextInputValuePASSWORD(newText)}
                        />
                    </View>
                </View>
                <View style={styles.dividerview}>
                    <Text style={styles.divider}/>
                </View>
                {/*登录按钮*/}
                <View style={styles.ItemViewButtom}>
                    <TouchableOpacity style={styles.loginView} onPress={this.JumpMainScreen}>
                        <Text style={styles.loginbutton}>{"登录"}</Text>
                    </TouchableOpacity>
                </View>
                {/*忘记密码和新用户注册*/}
                <View style={styles.buttomView}>
                    <TouchableOpacity style={styles.buttonView} onPress={() => navigate('SetPassword')}>
                        <Text style={styles.button}>{"忘记密码?"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonView} onPress={() => navigate('Register')}>
                        <Text style={styles.button}>{"新用户注册"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECEDF1',
    },
    title:{
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#06C1AE',
    },

    Image:{
        height:160,
        width:160,
        borderRadius:160,
        backgroundColor:'white',
        marginLeft:width/2-80,
        marginBottom:40,
    },
    buttonTopView:{
        justifyContent:'flex-end',
        flexDirection:'row',
        marginRight:10,
        marginLeft:10,
        marginTop:7.5,
        marginBottom:30,
    },
    button:{
        color:'#06C1AE',
    },
    username:{
        flexDirection:'row',
    },
    password:{
        flexDirection:'row',
    },
    ItemText:{
        //flex:1,
        flexDirection:'row',
        marginLeft:30,
        marginRight:5,
        fontSize:15,
    },
    ItemView:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        marginBottom:20,
    },
    userImage:{
        resizeMode: 'stretch',
        height:25,
        width:25,
        marginLeft:10,
    },
    ItemViewButtom:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#ECEDF1',
        marginTop:10,
    },
    ItemTextInput:{
        flex:1,
        flexDirection:'row',
        height:44,
        textAlign:'center'
    },
    Box1: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'white',
        //alignItems: 'center',
    },
    selectView:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#5AA4C3',
        marginTop:30,
        height:55,
        width:55,
        borderRadius:75,
    },
    loginView:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#06C1AE',
        marginTop:10,
        height:44,
        width:width-20,
        borderRadius:5,
    },
    buttomView:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        marginBottom:10,
        marginRight:10,
        marginLeft:10,
    },
    buttonView:{
        justifyContent:'flex-end',
        flexDirection:'row',
    },
    loginbutton:{
        color:'white'
    },
    loginbuttonEnable:{
        color:'white'
    },
    disabled:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        height:55,
        width:55,
        borderRadius:75,
        backgroundColor:'gray'
    },
    dividerview: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
});
