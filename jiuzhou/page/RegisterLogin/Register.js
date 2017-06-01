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
export default class Register extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            disabled: false,//控制验证码按钮是否禁用
            disabled1: false,//控制下一步按钮是否禁用
            phone:'',
            Time:60,
            check:'',
            USERNAME:'',
            PASSWORD:'',
        };
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
        this.timer1 && clearInterval(this.timer1);
    }
    //监听TextInput中用户名的变化
    updateTextInputValueUSERNAME(newText){
        this.setState({USERNAME: newText});
    }
    //监听TextInput中密码的变化
    updateTextInputValuePASSWORD(newText){
        this.setState({PASSWORD: newText});
    }
    updateTextInputValuephone(newText){
        this.setState({phone: newText});
    }
    updateTextInputValuecheck(newText){
        this.setState({check: newText});
    }



    //获取验证码
    _sendMessage=()=>{
        if(this.state.USERNAME.length===0){
            ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
            //判断用户名是否为空，为空提示用户输入用户名
        }else if(this.state.PASSWORD.length===0){
            ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
            //判断密码是否为空，为空提示用户输入密码
        }else if(this.state.phone.length===0){
            ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
            //判断手机号是否为空，为空提示用户输入手机号
        }else if(this.state.phone.length!==11){
            ToastAndroid.show('请输入正确的手机号', ToastAndroid.SHORT);
            //判断手机号是否为11位，为空提示用户输入正确的手机号
        }else{
            this.setState({
                disabled: true,
            });
            let user = new AV.User();
            user.set("username", this.state.USERNAME);
            //设置用户名
            user.set("password", this.state.PASSWORD);
            //设置密码
            user.setMobilePhoneNumber(this.state.phone);
            //设置电话
            user.signUp().then(function (result) {
                console.log(result);
                let fid = [result.id];
                let myid = result.id;
                let friend = new AV.Object('friend');
                // 指定 reminders 是做一个 Date 对象数组
                friend.addUnique('fid', fid);
                friend.set('myid', myid);
                friend.save().then(function (result) {
                    console.log(result.id);
                }, function (error) {
                    // 异常处理
                    console.error(error);
                });
            });
            //注册


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
        const  navigation = this.props.navigation;
        if(this.state.USERNAME.length===0){
            ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
            //判断用户名是否为空，为空提示用户输入用户名
        }else if (this.state.PASSWORD.length===0){
            ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
            //判断密码是否为空，为空提示用户输入密码
        }else if (this.state.phone.length===0){
            ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
            //判断手机号是否为空，为空提示用户输入手机号
        }else if (this.state.phone.length!==11){
            ToastAndroid.show('请输入正确的手机号', ToastAndroid.SHORT);
            //判断手机号是否为11位，为空提示用户输入正确的手机号
        }else if (this.state.check.length === 0){
            ToastAndroid.show('请输入验证码', ToastAndroid.SHORT);
            //判断验证码是否为空，为空提示用户输入验证码
        }else {
            AV.User.verifyMobilePhone(this.state.check).then(function(){
                //调用AV.User.verifyMobilePhone验证短信
                navigation.goBack();
                ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                //验证成功返回登陆页面
            }, function(err){
                //验证失败
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
                    <Text style={styles.headtitle}>注册</Text>
                </View>

                <View style={styles.inputview}>
                    {/*请输入用户名*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>{"账    号："}</Text>
                        <View style={styles.Box1}>
                            <TextInput
                                style={styles.ItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder= "请输入要注册的账号"
                                placeholderTextColor='#bfbfbf'
                                onChangeText={(newText) => this.updateTextInputValueUSERNAME(newText)}
                            />
                        </View>
                    </View>
                    {/*请输入密码*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>{"密    码："}</Text>
                        <View style={styles.Box1}>
                            <TextInput
                                style={styles.ItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder= "请输入要注册的密码"
                                placeholderTextColor='#bfbfbf'
                                onChangeText={(newText) => this.updateTextInputValuePASSWORD(newText)}
                            />
                        </View>
                    </View>

                    {/*请输入手机号*/}
                    <View style={styles.inputview1}>
                        <Text  style={styles.phoneitem}>手机号：</Text>
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
                        <Text  style={styles.phoneitem}>验证码：</Text>
                        <TextInput underlineColorAndroid='transparent' style={styles.ItemTextInput} placeholder='请输入验证码'
                                   placeholderTextColor='#bfbfbf'
                                   onChangeText={(newText) => this.updateTextInputValuecheck(newText)}
                                   secureTextEntry={true}/>
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
