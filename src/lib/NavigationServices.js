import { NavigationActions } from "react-navigation";

let _navigator = null;

function setTopLevelNavigator(navigatorRef) {
  if (navigatorRef) {
    _navigator = navigatorRef;
  }
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

export { setTopLevelNavigator, navigate };
