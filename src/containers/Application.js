/**
 * # Application.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 */
'use strict'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from "redux";

import * as initialLoadActions from '../modules/loginForm/LoginAction'

import {
    StyleSheet,
    View,
    Text
}
    from 'react-native'

var styles = StyleSheet.create({
    container: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginTop: 80,
        padding: 10
    },
    summary: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({  ...initialLoadActions }, dispatch)
    };
}

class Application extends PureComponent {

    componentDidMount() {
        this.props.actions.initialLoadAction()
     }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.summary}>BijNis App Version : 1.0</Text>
            </View>
        )
    }

}

/**
 * Connect the properties
 */
export default connect(null, mapDispatchToProps)(Application)
