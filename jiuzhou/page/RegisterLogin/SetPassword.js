/**
 * Created by Tong on 2017/5/11.
 */
/**
 * Created by Tong on 2017/5/11.
 */
/**
 * Created by Tong on 2017/5/11.
 */
/**
 * Created by 1 on 2016/11/23.
 */
/**
 * Created by 1 on 2016/10/21.
 * 新用户注册界面（先进行短信验证）
 */
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Image,
}from 'react-native';
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
export default class SetPassword extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            disabled: false,//控制验证码按钮是否禁用
            disabled1: false,//控制下一步按钮是否禁用
            phone:'',
            Time:60,
            check:'',
            PASSWORD:'',
            NEWPASSWORD:'',
        };
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
        this.timer1 && clearInterval(this.timer1);
    }
    //监听输入的新密码
    updateTextInputValuePASSWORD(newText){
        this.setState({PASSWORD: newText});
    }
    updateTextInputValueNEWPASSWORD(newText){
        this.setState({NEWPASSWORD: newText});
    }
    updateTextInputValuephone(newText){
        this.setState({phone: newText});
    }
    updateTextInputValuecheck(newText){
        this.setState({check: newText});
    }



    //获取验证码
    _sendMessage=()=>{
        if(this.state.phone.length===0){
            ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
            //判断手机号是否为空，为空提示用户输入手机号
        }else if(this.state.phone.length!==11){
            ToastAndroid.show('请输入正确的手机号', ToastAndroid.SHORT);
            //判断手机号是否为11位，为空提示用户输入正确的手机号
        }else{
            this.setState({
                disabled: true,
            });
            AV.User.requestPasswordResetBySmsCode(this.state.phone).then(function (success) {
                //调用AV.User.requestPasswordResetBySmsCode方法获取验证码
            }, function (error) {
            });
            this.timer=setTimeout(()=>{ this.setState({disabled: false})},60000);
            this.timer1=setInterval(()=>{
                this.setState({Time:this.state.Time-1});
                if(this.state.Time===0){
                    this.setState({Time:60});
                    this.timer1 && clearInterval(this.timer1);
                }
            },1000);
            //获取验证码按钮点击后禁用，倒计时60秒后可重新获取

        }

    };

    //验证验证码是否正确
    _checkMessage=()=> {
        const navigation = this.props.navigation;
        if (this.state.PASSWORD===0){
            ToastAndroid.show('请输入新密码！', ToastAndroid.SHORT);
            //判断密码是否为空，为空提示用户输入密码
        }else if(this.state.PASSWORD.length<6){
            ToastAndroid.show('密码长度至少六位', ToastAndroid.SHORT);
            //判断密码长度是否大于等于六位，为空提示用户密码长度至少六位
        }else if(this.state.NEWPASSWORD===0){
            ToastAndroid.show('请确认新密码！', ToastAndroid.SHORT);
            //判断密码是否为空，为空提示用户输入密码
        }
        else if(this.state.PASSWORD!==this.state.NEWPASSWORD){
            ToastAndroid.show('两次输入的密码不一致！', ToastAndroid.SHORT);
            //判断两次输入的密码是否一致，不一致则提醒用户
        }
        else if (this.state.check.length === 0){
            ToastAndroid.show('请输入验证码', ToastAndroid.SHORT);
            //判断验证码是否为空，为空提示用户输入验证码
        }else {
            AV.User.resetPasswordBySmsCode(this.state.check, this.state.NEWPASSWORD).then(function (success) {
                //调用AV.User.resetPasswordBySmsCode方法验证验证码并设置新密码
                navigation.goBack();
                //设置成功返回登陆页面
            }, function (error) {
            });
        }
    };

    static navigationOptions = ({ navigation }) => ({
        header:null,
    });
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                {/*标题*/}
                <View style={styles.header}>
                    <Text style={styles.headtitle}>重设密码</Text>
                </View>

                <View style={styles.inputview}>
                    {/*请输入密码*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>{"密    码    ："}</Text>
                        <View style={styles.Box1}>
                            <TextInput
                                style={styles.ItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder= "请输入新密码"
                                placeholderTextColor='#bfbfbf'
                                onChangeText={(newText) => this.updateTextInputValuePASSWORD(newText)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    {/*再输入密码*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>确认密码：</Text>
                        <View style={styles.Box1}>
                            <TextInput
                                style={styles.ItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder= "请再确认密码"
                                placeholderTextColor='#bfbfbf'
                                onChangeText={(newText) => this.updateTextInputValueNEWPASSWORD(newText)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    {/*请输入手机号*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>{"手机号    ："}</Text>
                        <View style={styles.Box1}>
                            <TextInput
                                style={styles.ItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder= "请输入手机号"
                                placeholderTextColor='#bfbfbf'
                                onChangeText={(newText) => this.updateTextInputValuephone(newText)}
                            />
                        </View>
                    </View>

                    {/*请输入验证码*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>{"验证码    ："}</Text>
                        <TextInput underlineColorAndroid='transparent' style={styles.ItemTextInput} placeholder='请输入验证码'
                                   placeholderTextColor='#bfbfbf'
                                   onChangeText={(newText) => this.updateTextInputValuecheck(newText)}
                                   />
                        <TouchableOpacity style={[styles.loginView,this.state.disabled&&styles.disabled]} onPress={this._sendMessage} disabled={this.state.disabled}>
                            {this.state.disabled===false?<Text style={styles.loginbutton}>{"获取验证码"}</Text>:<Text style={styles.loginbutton}>{"重新获取（"+ this.state.Time+"）"}</Text>}
                        </TouchableOpacity>

                    </View>

                </View>

                {/*下一步跳转到注册详情界面*/}
                <View style={styles.bottomview}>
                    <View>
                        <TouchableOpacity
                            style={styles.submit}
                            disabled={this.state.disabled1}
                            onPress={this._checkMessage}>
                            <Text style={styles.submitbutton}>{"下一步"}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECEDF1'
    },
    back:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:80,
    },
    header: {
        height: 44,
        backgroundColor: '#06C1AE',
        flexDirection:'row',
        alignItems:'center',
    },
    backtitle: {
        flex:1,
        color: '#ffffff',
        fontSize:14,
        textAlign:'center',
        marginRight:30,
    },
    headtitle: {
        flex:1,
        color: '#ffffff',
        fontSize:16,
        textAlign:'center',
    },
    returnImage:{
        resizeMode: 'stretch',
        height:15,
        width:15,
        marginLeft:5,
    },
    inputview: {
    },
    inputview1: {
        alignItems:'center',
        height: 50,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        marginTop:20,
    },
    loginView:{
        margin:5,
        overflow:'hidden',
        padding:8,
        borderRadius:4,
        backgroundColor: '#06C1AE'
    },
    loginbutton:{
        fontSize: 15,
        color: 'white',
    },
    disabled:{
        backgroundColor:'gray',
    },
    phoneitem: {
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        fontSize:16,
        marginLeft:10,
    },
    Box1: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'white',
        //alignItems: 'center',
        marginRight:30,
    },
    ItemTextInput:{
        flex:1,
        flexDirection:'row',
        height:44,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
        marginTop:30,
    },
    submit:{
        marginTop:20,
        marginLeft:30,
        marginRight:30,
        padding:10,
        height:44,
        overflow:'hidden',
        borderRadius:4,
        backgroundColor: '#06C1AE',
        alignItems:'center',
        justifyContent:'center',
    },
    submitbutton:{
        fontSize: 15,
        color: 'white',

    },
});
