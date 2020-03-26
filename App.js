/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import ViewPagerComponent from './components/ViewPageComponent';
const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <ViewPagerComponent />
    </SafeAreaView>
  );
};

export default App;
