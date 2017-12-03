import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ValuesSlider from './components/values-slider/ValuesSlider';
import ObjectivesList from './components/objectives-list/ObjectivesList';
import Confirm from './components/confirm/Confirm';
import {
  StackNavigator,
} from 'react-navigation';

const SimpleApp = StackNavigator({
  Home: { screen: ObjectivesList },
  NewObjective: { screen: ValuesSlider },
  ConfirmApplication: { screen: Confirm }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
