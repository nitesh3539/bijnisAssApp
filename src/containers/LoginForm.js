import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  Dimensions
} from 'react-native';

import UserInput from '../component/UserInput';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import bgSrc from '../images/wallpaper.png';
import style from '../lib/FeStyle'
import { Button } from 'native-base';
import * as globalActions from "../modules/GlobalAction";
import * as loginActions from '../modules/loginForm/LoginAction'
import {  SET_LOGIN_PASSWORD, SET_LOGIN_USERNAME, SET_LOGIN_ERROR_MESSAGE } from '../lib/Constants'


function mapStateToProps(state) {
  return {
    errorMessage: state.loginReducer.errorMessage,
    loginLoader: state.loginReducer.loginLoader,
    username: state.loginReducer.username,
    password: state.loginReducer.password,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions, ...loginActions }, dispatch)
  };
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      buttonView: 'Login Account',
    };
    this.showPass = this.showPass.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  buttonPress() {
    this.props.actions.onLogInButtonPressed(this.props.username, this.props.password, this.state.buttonView)
  }

  suffleSetting(){
    this.setState({ buttonView: this.state.buttonView == 'Login Account' ? 'Create Account' : 'Login Account' })
    this.props.actions.setState(SET_LOGIN_ERROR_MESSAGE, '')
  }

  render() {
    return (
      <ImageBackground style={[styles.picture]} source={bgSrc}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
          <Text style={{ fontWeight: '500', fontSize: 20, color: '#fff', marginTop: 20 }}>BIJ NIS</Text>
        </View> 
        <View style={styles.container}>
          <UserInput
            source={usernameImg}
            placeholder="Username"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onChangeText={(text) => this.props.actions.setState(SET_LOGIN_USERNAME, text)}
            autoCorrect={false}
          />
          <View style={{ marginTop: 60 }}>
            <UserInput
              source={passwordImg}
              secureTextEntry={this.state.showPass}
              placeholder="Password"
              returnKeyType={'done'}
              onChangeText={(text) => this.props.actions.setState(SET_LOGIN_PASSWORD, text)}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            activeOpacity={this.state.showPass ? 7.0 : 0.2}
            style={[styles.btnEye, { top: this.props.errorMessage ? -42 : -30 }]}
            onPress={this.showPass}>
            <Image source={eyeImg} style={[styles.iconEye, { tintColor: (!this.state.showPass ? '#000' : 'rgba(0,0,0,0.2)') }]} />
          </TouchableOpacity>
          {this.props.errorMessage ? <Text style={{ color: '#fff', marginBottom: 10 }}>{this.props.errorMessage}</Text> : null}
          <View style={{ marginBottom: '5%' }}>
            <Button
              full rounded success
              onPress={() => this.buttonPress()}
              style={styles.input}
            >
              <Text style={[style.fontWhite, { fontSize: 20, marginRight: 40 }]}>{this.state.buttonView}</Text>
            </Button>
          </View>
          <View>
            <Text
              style={{ fontSize: 16, color: '#fff', marginBottom: '30%', marginRight: '55%' }}
              onPress={() => this.suffleSetting()}
            >
              {(this.state.buttonView == 'Login Account') ? 'Create Account' : 'Login Account'}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%'
  },
  btnEye: {
    flex: 1,
    position: 'absolute',
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#F035E0',
    width: DEVICE_WIDTH - 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);