/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import RootScene from './src/RootScene';
import Navigator from './jiuzhou/RootScene';
import AV from 'leancloud-storage';
const APP_ID = 'H1Y1tHCMNNAdvAx6EMMNNvCJ-gzGzoHsz';
const APP_KEY = 'OhXxC9b2HhnXFlXM9KPnoi4X';
AV.initialize(APP_ID, APP_KEY);
if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}
// export default class MeiTuan extends Component {
//     render() {
//         return (
//             <RootScene />
//         );
//     }
// }
// AppRegistry.registerComponent('MeiTuan', () => MeiTuan);

AppRegistry.registerComponent('MeiTuan', () => Navigator);
