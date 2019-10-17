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

import { SET_MODAL_VIEW, SET_TYMLINE_TEXT, ON_CANCEL_PRESS } from "../lib/Constants";
import styles from "../lib/FeStyle";
import TitleHeader from "../component/TitleHeader";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import { navigate } from "../lib/NavigationServices";
import * as tymeLineProfileAction from '../modules/profileView/TymLineActions'


function mapStateToProps(state) {
  return {
    tymLineList: state.profileViewReducers.tymLineList,
    showModalView: state.profileViewReducers.showModalView,
    tymLineTextView: state.profileViewReducers.tymLineTextView,
    tymLineLoader: state.profileViewReducers.tymLineLoader
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions, ...tymeLineProfileAction }, dispatch)
  };
}

class ProfileView extends PureComponent {
  componentDidMount() {
    this.props.actions.getTymLineProfileList(this.props.navigation.state.params)
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

  pressOnProfile(id) {
    navigate("ProfileDetails", { profileId: id, profileListObject: this.props.tymLineList, userId: this.props.navigation.state.params.userId });
  }

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

  _showActionSheet(id) {
    let BUTTONS = []
    BUTTONS.push('Edit', 'Delete', 'Cancel')
    ActionSheet.show(
      {
        options: BUTTONS,
        title: 'Update Profile',
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 1
      },
      buttonIndex => {
        (buttonIndex > -1 && buttonIndex < (BUTTONS.length - 1)) ? this.onActionSheetPress(BUTTONS[buttonIndex], id) : null
      }
    )
  }

  onActionSheetPress(button, id) {
    if (button == 'Edit') {
      this.props.actions.setState(SET_MODAL_VIEW, id)
    } else if (button == 'Delete') {
      Alert.alert(
        'Deleting Profile',
        'Are you sure you want to Delete this profile?',
        [{ text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => this.props.actions.deleteProfileFormList(id, this.props.navigation.state.params.userId) }],
        { cancelable: false }
      )
    }
  }

  renderData(item) {
    return (
      <TouchableOpacity
        style={[styles.justifyCenter, styles.alignCenter, { borderBottomColor: "#e4e4e4", borderBottomWidth: 1, }]}
        onPress={() => this.pressOnProfile(item.id)}
      >
        <Image
          style={[{ width: '72%', height: 300, resizeMode: "cover", margin: 50 }]}
          source={require('../images/travel.jpg')} />
        <Right style={{ position: 'absolute', top: 0, left: 0, right: 0, margin: 60 }}>
          <TouchableOpacity onPress={() => { this._showActionSheet(item.id) }}>
            <MaterialIcons
              name={'more-vert'}
              style={[
                styles.fontWhite,
                { fontSize: 25 },
              ]}
            />
          </TouchableOpacity>
        </Right>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 370, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.fontWhite, { fontSize: 30 }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }


  modalDialogView() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
      }}>
        <Modal animationType={"fade"}
          transparent={true}
          visible={this.props.showModalView}
          onRequestClose={() => { }}
          presentationStyle={"overFullScreen"}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={style.Alert_Main_View}>
              <Text style={style.Alert_Title}>Create A New TymLine</Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginTop: 15 }} />
              <View style={[styles.padding10, styles.marginBottom10]}>
                <Text style={[styles.fontCenter, styles.bold, styles.marginBottom10]}>{'Tymline Name:            '}</Text>
                <Item regular>
                  <Input
                    onChangeText={(text) => { this.props.actions.setState(SET_TYMLINE_TEXT, text) }}
                    style={{ height: 40, fontSize: 13 }}
                    keyboardType='default'
                    value={_.size(this.props.tymLineTextView) ? this.props.tymLineTextView : Number.isInteger(this.props.showModalView) ? this.props.tymLineList[this.props.showModalView].name : ''}
                    returnKeyType='done' />
                </Item>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
              <View style={{ flexDirection: 'row', height: '25%' }}>
                <TouchableOpacity
                  style={style.buttonStyle}
                  onPress={() => { this.props.actions.setState(ON_CANCEL_PRESS) }}
                  activeOpacity={0.7}
                >
                  <Text style={style.TextStyle}>Cancel</Text>
                </TouchableOpacity>
                <View style={{ width: 1, height: '100%', backgroundColor: '#000' }} />
                <TouchableOpacity
                  style={style.buttonStyle}
                  onPress={() => { this.props.actions.setListOnPostPress(this.props.tymLineTextView, this.props.showModalView, this.props.navigation.state.params.userId) }}
                  activeOpacity={0.7}
                >
                  <Text style={style.TextStyle}> Post </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  addNewTymLinePage() {
    return (
      <View style={[styles.justifyCenter, styles.alignCenter, { borderBottomColor: "#e4e4e4", borderBottomWidth: 1, }]}>
        <TouchableOpacity
          style={[{ backgroundColor: '#9B9B9B', width: '72%', margin: 50, height: 300 }, styles.alignCenter, styles.justifyCenter]}
          onPress={() => { this.props.actions.setState(SET_MODAL_VIEW, true) }}
        >
          <Text style={[styles.fontWhite, { fontWeight: '600', fontSize: 20 }]}>Create New TymLine</Text>
          <MaterialIcons
            name={"add-circle"}
            style={[
              styles.fontWhite,
              styles.fontLeft,
              { alignItems: 'center', marginTop: 20, fontSize: 30 }
            ]}
          />
        </TouchableOpacity>
      </View>
    )
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
    let modalDialogView = this.modalDialogView()
    console.log("tymLineList", this.props.tymLineList)
    return (
      <Content style={{ backgroundColor: "#fff", position: 'relative' }}>
        <TitleHeader
          pageName={"TymLine"}
          goBack={() => this.props.navigation.goBack(null)}
          onLogoutPress={this.signOut}
        />
        {modalDialogView}
        <View>{this.addNewTymLinePage()}</View>
        <View>
          <FlatList
            data={Object.values(this.props.tymLineList)}
            renderItem={item => this.renderData(item.item)}
            keyExtractor={item => String(item.id)}
          />
        </View>
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
