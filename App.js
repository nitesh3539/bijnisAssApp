import React, { PureComponent } from "react";
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import AppWithNavigationState from './src/AppNavigator'


export default class App extends PureComponent {
  /// CLASS METHODS ///
  render() {
    return (
      <Provider store={configureStore({})}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}