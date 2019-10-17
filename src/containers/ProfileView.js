/**
 * # FoodItemView.js
 *  Display startup screen and
 *  navigate to FoodItemView
 */
"use strict";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as globalActions from "../modules/GlobalAction";

import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  BackHandler,
  Alert
} from "react-native";
import { Content, Button, Item, Input, Right, ActionSheet } from "native-base";

import styles from "../lib/FeStyle";
import TitleHeader from "../component/TitleHeader";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import { navigate } from "../lib/NavigationServices";


function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions }, dispatch)
  };
}

class ProfileView extends PureComponent {
  componentDidMount() {
    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  onBackButtonPressAndroid = () => {
    return false
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };


  _itemButtonView(item) {
    return (
      <Button
        full
        rounded
        success
        disabled={!item.count}
        onPress={() => this.cartButtonPress(item)}
        style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}
      >
        <Text style={[styles.fontWhite]}>ADD TO CART</Text>
      </Button>
    );
  }


  signOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to Logout?',
      [{ text: 'Cancel', style: 'cancel' },
      { text: 'Ok', onPress: () => this.props.actions.onLogoutPress() }],
      { cancelable: false }
    )
  }

  render() {
    return (
      <Content style={{ backgroundColor: "#fff", position: 'relative' }}>
        <TitleHeader
          pageName={"BijNis"}
          goBack={() => this.props.navigation.goBack(null)}
          onLogoutPress={this.signOut}
        />
        {/* <View>
          <FlatList
            data={Object.values(this.props.tymLineList)}
            renderItem={item => this.renderData(item.item)}
            keyExtractor={item => String(item.id)}
          />
        </View> */}
      </Content>
    );
  }
}


const style = StyleSheet.create({
  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#e4e3e8",
    height: 230,
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 7,
  },
  Alert_Title: {
    fontSize: 18,
    color: "#000",
    textAlign: 'center',
    height: '15%',
    marginTop: 20
  },
  Alert_Message: {
    fontSize: 22,
    color: "#000",
    textAlign: 'center',
    padding: 40,
    height: '22%'
  },
  buttonStyle: {
    width: '50%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: -5
  }
});

/**
 * Connect the properties
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);