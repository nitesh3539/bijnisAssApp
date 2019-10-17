import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import LoginForm from './containers/LoginForm'
import Application from './containers/Application'
import { setTopLevelNavigator } from './lib/NavigationServices';
import {  Root } from 'native-base'
import ProfileView from './containers/ProfileView'


class AppWithNavigationState extends React.PureComponent {
  render() {
    return (
      <Root>
      <AppNavigator
        ref={
          navigatorRef => {
            setTopLevelNavigator(navigatorRef);
          }
        }
      />
      </Root>
    )
  }
}
const AppNavigator = createAppContainer(createSwitchNavigator({
ApplicationScreen: Application,
LoginForm: LoginForm,
ProfileView: ProfileView
},{
  initialRouteName: 'ApplicationScreen',
  backBehavior: 'none',
  resetOnBlur: true
}));

export default AppWithNavigationState;