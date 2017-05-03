import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import cacheAssetsAsync from './util/cacheAssetsAsync';
import Router from './navigation/Router';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { LIGHTER } from './util/colors';

class App extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        fonts: [
          { 'Quintessential': require('./assets/fonts/Quintessential-Regular.ttf') },
          { 'Baskerville': require('./assets/fonts/LibreBaskerville-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('contents')}
              defaultRouteConfig={{ sceneStyle: styles.sceneStyle }}
            />
          </NavigationProvider>
        </View>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneStyle: {
    backgroundColor: LIGHTER,
  },
});

Expo.registerRootComponent(App);
