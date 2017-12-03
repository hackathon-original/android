import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, DatePickerAndroid, TouchableHighlight } from 'react-native';
import { Slider } from 'react-native-elements';
import colors from '../colors';
import { currency } from '../../services/format';
import { getObjectives } from '../../services/rest';
import Objective from './Objective';

export default class ObjectivesList extends React.Component {
  static navigationOptions = {
    title: 'Objetivos',
  };
  constructor() {
    super();
    this.state = {
      objectives: []
    };
  }
  componentDidMount() {
    getObjectives().then(objectives => {
      this.setState({ objectives });
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, marginTop: 15, marginLeft: 30, marginRight: 30}}>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
          {this.state.objectives
            .map((o, i) => (<Objective key={i} text={o.target}
              style={{}}
              target={o.target}
              targetAmount={o.targetAmount}
              savedAmount={o.savedAmount}
              date={o.date} />))}
        </View>
        <TouchableHighlight  onPress={() => navigate('NewObjective')} style={{position: 'absolute', bottom: 30, right: 0, borderRadius: 100, backgroundColor: colors.accentColor }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, paddingLeft: 20, paddingRight: 20, paddingTop: 9, paddingBottom: 9}}>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}