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
import {SET_PROILE_LIST} from '../lib/Constants'
import { keyValueDB } from '../lib/DbServices'
import AsyncStorage from '@react-native-community/async-storage';




function mapStateToProps(state) {
  return {
   errorMessage : state.profileReducer.errorMessage,
   profileLoader : state.profileReducer.profileLoader,
   pokemonList : state.profileReducer.pokemonList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions }, dispatch)
  };
}

class ProfileView extends PureComponent {
  componentDidMount() {
    this.props.actions.getPokemonList()
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

  state = {
    showModal : false
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
          visible={this.state.showModal != false}
          onRequestClose={() => { }}
          presentationStyle={"overFullScreen"}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={style.Alert_Main_View}>
              <Text style={style.Alert_Title}>Details</Text>
              <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginTop: 5 }} />
              <View style={[styles.padding10]}>
                <Text style={[styles.fontCenter, styles.bold, {marginBottom : 2}]}>{`Name : ${this.state.showModal.name}`}</Text>
                <Text style={[styles.fontCenter, styles.bold, {marginBottom : 2}]}>{`Sex : ${this.state.showModal.gender}`}</Text>
                <Text style={[styles.fontCenter, styles.bold, {marginBottom : 2}]}>{`Height : ${this.state.showModal.height}`}</Text>
                <Text style={[styles.fontCenter, styles.bold, {marginBottom : 2}]}>{`Mass : ${this.state.showModal.mass}`}</Text>
                <Text style={[styles.fontCenter, styles.bold, {marginBottom : 2}]}>{`Color : ${this.state.showModal.skin_color}`}</Text>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor : '#000' }} />
              <TouchableOpacity style={{ flexDirection: 'row', height: '25%' }}>
                <TouchableOpacity
                  style={style.buttonStyle}
                  onPress={() => { this.setState({showModal : false}) }}
                >
                  <Text style={style.TextStyle}>Close</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  async makeFavourite(selectedId, pokemonList){
    let cloneList = JSON.parse(JSON.stringify(pokemonList))
    for(let id in cloneList){
      if(cloneList[id].id == selectedId){
        cloneList[id].fav = true
        break
      }
    }
    try{
     AsyncStorage.setItem('POKEMON_LIST', JSON.stringify(cloneList))
    }catch(err){
      console.log("err1212",err)
    }
    this.props.actions.setState(SET_PROILE_LIST, cloneList)
  }

  renderData(item) {
    return (
      <View style={{ paddingLeft : 7, paddingRight : 7, paddingTop : 5, paddingBottom : 2 }}>
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              borderRadius : 10,
              backgroundColor : '#d4d4d4'
            }
          ]}
        >
          <Text
            style={[{ fontSize: 16, color: "#a4a4a4", alignItems: "center", marginBottom: 5, marginTop: 10 }]}
          >
            {item.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignContent: "space-around",
              flex: 1,
              marginTop: 10
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor : '#4286f4',
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                borderRadius: 10,
                width : '49%'
              }}
              onPress={() => {
                this.setState({showModal : item})
              }}
            >
              <Text
                style={{ color: "#e4e4e4", fontSize: 16, fontWeight: "bold", textAlign : 'center' }}
              >
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: item.fav == true ? "#c005E0" : "#4286f4",
                // paddingHorizontal: "17%",
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                borderRadius: 10,
                width : '49%'
              }}
              onPress={() => {
                 this.makeFavourite(
                  item.id,
                  this.props.pokemonList
                );
              }}
            >
              <Text
                style={{ color: "#e4e4e4", fontSize: 16, fontWeight: "bold", textAlign : 'center' }}
              >
                Favourite
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    console.log("data",this.props)
    let modalDialogView = this.modalDialogView()
    return (
      <Content style={{ backgroundColor: "#fff", position: 'relative' }}>
        <TitleHeader
          pageName={"BijNis"}
          goBack={() => this.props.navigation.goBack(null)}
          onLogoutPress={this.signOut}
        />
        {modalDialogView}
        <View>
          <FlatList
            data={Object.values(this.props.pokemonList)}
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