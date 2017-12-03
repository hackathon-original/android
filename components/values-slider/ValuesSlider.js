import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, DatePickerAndroid } from 'react-native';
import { Slider } from 'react-native-elements';
import colors from '../colors';
import { currency } from '../../services/format';
import { getBalance, getRewards } from '../../services/rest';

export default class ValuesSlider extends React.Component {
  static navigationOptions = {
    title: 'Adicionar Aplicação',
  };
  constructor() {
    super();
    this.state = {
      amountCc: 0,
      amountRewards: 0,
      amountCcMax: 0,
      amountRewardsMax: 0,
      target: '',
      date: 'Escolher data'
    };
  }
  componentDidMount() {
    getBalance().then(balance => {
      this.setState({
        amountCcMax: Number(balance.current_balance)
      });
    });
    getRewards().then(rewards => {
      rewards = rewards.current_balance;
      this.setState({
        amountRewards: Number(rewards),
        amountRewardsMax: Number(rewards)
      });
    });
  }
  tradeBitcoin() {
    const { navigate } = this.props.navigation;
    let objective = {
      target: this.state.target,
      targetAmount: this.state.targetValue,
      date: this.state.date,
      savedAmount: this.state.amountRewards + this.state.amountCc
    };
    let application = {
      amount_cc: this.state.amountCc,
      amount_rewards: this.state.amountRewards
    }
    navigate('ConfirmApplication', { objective, application })
    return console.log('trade');
  }
  getDate() {
    try {
      DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      })
      .then(response => {
        const {action, year, month, day} = response;
        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          this.setState({date: `${day}/${month+1}/${year}`});
        }
      });
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{ width: 200 }}>
          <Image source={require("../../assets/btc-intro.jpg")} style={{ width: 512 }}/>
        </View> */}

        <View style={styles.slidersContainer}>
          <Text>Nomeie seu objetivo</Text>
          <TextInput
            style={{ height: 40, marginBottom: 10 }}
            onChangeText={(target) => this.setState({target})}
            value={this.state.target}
            placeholder={"Ex: Viagem para o Canadá"}/>

          <Text>Qual o valor desejado?</Text>
          <TextInput
            style={{ height: 40, marginBottom: 20 }}
            onChangeText={(targetValue) => this.setState({targetValue})}
            value={this.state.targetValue}
            placeholder={"Ex: 1200.00"}/>

          <View style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, justifyContent: 'center', marginTop: 7 }}>Saldo em conta</Text>
              <Text style={styles.currentBalance}>{currency(this.state.amountCc)}</Text>
            </View>
            <Slider
                step={0.01}
                minimumValue={0}
                maximumValue={this.state.amountCcMax}
                value={this.state.amountCc}
                minimumTrackTintColor={colors.accentColor}
                thumbTintColor={colors.primaryColor}
                onValueChange={(amountCc) => this.setState({amountCc})} />
          </View>
          <View style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, justifyContent: 'center', marginTop: 7 }}>Saldo em Rewards</Text>
              <Text style={styles.currentBalance}>{currency(this.state.amountRewards)}</Text>
            </View>
            <Slider
              step={1}
              minimumValue={0}
              maximumValue={this.state.amountRewardsMax}
              value={this.state.amountRewards}
              minimumTrackTintColor={colors.accentColor}
              thumbTintColor={colors.primaryColor}
              onValueChange={(amountRewards) => this.setState({amountRewards})} />
          </View>
            
          <Text style={{ marginBottom: 10, marginTop: 20 }}>Para quando é o objetivo?</Text>
          <Button
            style={{}}
            color={colors.accentColor}
            onPress={() => this.getDate()}
            title={this.state.date}/>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Text style={{ marginTop: 7 }}>Total a ser aplicado:</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 22, textAlign: 'right', color: colors.accentColor }}>{currency(this.state.amountCc + this.state.amountRewards)}</Text>
          </View>
        </View>

        <View style={styles.mainButtonContainer}>
          <Button onPress={() => this.tradeBitcoin()}
            title={"Aplicar"}
            color={colors.primaryColor}></Button>
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