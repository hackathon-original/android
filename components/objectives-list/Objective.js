import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, DatePickerAndroid } from 'react-native';
import { Slider } from 'react-native-elements';
import colors from '../colors';
import { currency } from '../../services/format';

export default class ValuesSlider extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let percentage = (this.props.savedAmount / this.props.targetAmount) * 100;
    return (
      <View style={{ alignContent: 'flex-start', flex: 1, flexDirection: 'column' }}
        {...this.props}>
        <View style={{ marginBottom: 15, backgroundColor: '#ccc', borderRadius: 15 }}>
          <View style={{ backgroundColor: '#999', borderRadius: 15, padding: 15, paddingBottom: 5 }}>
            <View style={{ width: `100%`, backgroundColor: '#ccc', borderRadius: 5 }}>
              <View style={{ height: 20, width: `${percentage}%`, backgroundColor: colors.primaryColor }}></View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff', textAlign: 'right' }}>{percentage}%</Text>
          </View>
          <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15}}>
            <Text style={{fontWeight: 'bold',marginTop: 5}}>{this.props.target}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1, fontSize: 12}}>Objetivo: {currency(this.props.targetAmount)}</Text>
              <Text style={{flex: 1, fontSize: 12}}>Depositado: {currency(this.props.savedAmount)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}