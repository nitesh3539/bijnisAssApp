import React from 'react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import ProfileView from './containers/ProfileView'
import ProfileDetails from './containers/ProfileDetails'
import LoginForm from './containers/LoginForm'
import Application from './containers/Application'
import { setTopLevelNavigator } from './lib/NavigationServices';
import {  Root } from 'native-base'

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
const AppNavigator = createSwitchNavigator({
ApplicationScreen: Application,
LoginForm: LoginForm,
AuthRoute : createStackNavigator({
  ProfileView: {
    screen: ProfileView,
  },
  ProfileDetails: {
    screen: ProfileDetails,
  },
})
},{
  initialRouteName: 'ApplicationScreen',
  backBehavior: 'none',
  resetOnBlur: true
})

export default AppWithNavigationState;