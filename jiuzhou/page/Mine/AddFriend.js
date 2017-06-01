/**
 * Created by Tong on 2017/5/30.
 */
/**
 * Created by 1 on 2016/11/28.
 */
/**
 * Created by 1 on 2016/11/23.
 */
import React,{Component}from 'react';
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
    RefreshControl
} from 'react-native';
import screen from '../../common/screen';
import color from '../../common/color';
let alertMessage1 = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
    'catalysts for change. Dynamically revolutionize.';
let alertMessage2 = 'sb';
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
let id='';

export default class AddFriend extends Component{
    static navigationOptions = ({ navigation, }) => ({
        headerTitle: (
            <Text style={{color:'white',fontSize:16,marginLeft:10}}>添加好友</Text>
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
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            trueSwitchIsOn: true,
            falseSwitchIsOn: false,
            phone:'',
        };
    }



    updateTextInputValuephone(newText){
        this.setState({phone: newText});
    }

    addFriend=()=>{
        const  navigation = this.props.navigation;
        Tong.load({
            key:'friend',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            id=ret.id;
            console.log(id);
            let query = new AV.Query('_User');
            query.equalTo('mobilePhoneNumber', this.state.phone);
            query.find().then(function (result) {
                // 第一个参数是 className，第二个参数是 objectId
                console.log(result);
                let todo = AV.Object.createWithoutData('friend', id);
                // 修改属性
                todo.addUnique('fid', result[0].id);
                todo.addUnique('cid', result[0].id);
                // 保存到云端
                todo.save().then(function () {
                    navigation.goBack(null);
                    ToastAndroid.show('添加成功', ToastAndroid.SHORT);
                });
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputview1}>
                    <Text  style={styles.phoneitem}>手机号：</Text>
                    <View style={styles.Box1}>
                        <TextInput
                            style={styles.ItemTextInput}
                            underlineColorAndroid='transparent'
                            placeholder= "请输入对方手机号"
                            placeholderTextColor='#bfbfbf'
                            onChangeText={(newText) => this.updateTextInputValuephone(newText)}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submit}
                    onPress={this.addFriend}>
                    <Text style={styles.submitbutton}>{"下一步"}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    buttonTopView:{
        justifyContent:'flex-end',
        flexDirection:'row',
        marginBottom:100,
        marginRight:10,
        marginLeft:10,
        marginTop:7.5,
    },
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
    TopView:{
        flexDirection:'row',
    },
    ItemText:{
        //flex:1,
        flexDirection:'row',
        marginLeft:30,
        marginRight:5,
        fontSize:15,
    },
    loginView:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#5AA4C3',
        marginTop:30,
        height:44,
        width:200,
        borderRadius:5,
    },

    loginbutton:{
        color:'white'
    },
    searchIcon: {
        marginLeft: 8,
        width: 27,
        height: 27
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
    inputview1: {
        alignItems:'center',
        height: 50,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        marginTop:20,
    },
    submit:{
        marginTop:30,
        marginLeft:10,
        marginRight:10,
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
