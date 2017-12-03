import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, DatePickerAndroid } from 'react-native';
import { Slider } from 'react-native-elements';
import colors from '../colors';
import { currency } from '../../services/format';
import { getBalance, getRewards, getBitcoin, applyBtc, addObjective } from '../../services/rest';

export default class ValuesSlider extends React.Component {
  static navigationOptions = {
    title: 'Confirmar Aplicação',
  };
  constructor() {
    super();
    this.state = {
      brl: 0,
      btc: 0,
      objective: null,
      application: null,
      application_cc: 0,
      application_rewards: 0
    };
  }
  componentDidMount() {
    let application = this.props.navigation.state.params.application;
    let objective = this.props.navigation.state.params.objective;
    console.log({objective, application})
    this.setState({
      application: application,
      objective: objective,
      application_cc: application.amount_cc,
      application_rewards: objective.amount_rewards
    });

    getBitcoin(application.amount_cc + application.amount_rewards).then(balance => {
      this.setState({
        btc: Number(balance.buy)
      });
    });
  }
  applyBitcoin() {
    const { navigate } = this.props.navigation;
    applyBtc({ amount_cc: this.state.application_cc, amount_rewards: this.state.application_rewards }).then(rewards => {
      return addObjective(objective);
    })
    .then(() => {
      return navigate('Objectives');
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, marginTop: 15, marginLeft: 30, marginRight: 30}}>
        <View style={{}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop:5}}>Débito na conta:</Text>
            <Text style={{flex:1,fontSize:20,textAlign:'right'}}>{currency(this.state.application_cc)}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop:5}}>Débito em Rewards:</Text>
            <Text style={{flex:1,fontSize:20,textAlign:'right'}}>{currency(this.state.application_rewards)}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop:5}}>Total da operação:</Text>
            <Text style={{flex:1,fontSize:20,textAlign:'right'}}>{currency(this.state.application_cc + this.state.application_rewards)}</Text>
          </View>
          <View style={{flexDirection: 'column',marginTop:30}}>
            <Text style={{marginTop:5}}>Quantidade de Bitcoins:</Text>
            <Text style={{fontSize:20,textAlign:'right'}}>{this.state.btc}</Text>
          </View>
          <Button onPress={() => this.applyBitcoin()} title={"Confirmar!"} color={colors.primaryColor}
            style={{marginTop: 30}}>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  slidersContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 30,
    marginRight: 30
  },
  slider: {
    display: 'flex',
    flexDirection: 'column'
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  currentBalance: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    textAlign: 'right',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginLeft: 30,
    marginRight: 30
  },
  mainButtonContainer: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 15
  },
  emptyButtonContainer: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 30
  },
  mainButton: {
    backgroundColor: colors.primaryColor
  },
  emptyButton: {
    backgroundColor: 'transparent',
    borderColor: colors.accentColor,
    borderWidth: 1,
    borderStyle: 'solid'
  }
});