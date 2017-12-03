import axios from 'axios';

export function getRewards() {
  return axios.get('http://hackathon-btc.now.sh/rewards')
    // .then(extractData); // api está fora
    .then(() => ({ "current_balance": 25 }));
}

export function getBalance() {
  return axios.get('http://hackathon-btc.now.sh/balance')
    .then(extractData);
}

const objectives = [{
  target: 'Investimento longo prazo',
  targetAmount: 50000,
  savedAmount: 17500,
  date: '15/12/2025'
}, {
  target: 'Viagem final do ano',
  targetAmount: 4000,
  savedAmount: 3400,
  date: '30/12/2017'
}];

export function getObjectives() {
  return new Promise((resolve, reject) => {
    resolve(objectives);
  });
}

export function addObjective(objective) {
  return new Promise((resolve, reject) => {
    objectives.push(objective);
    resolve(objectives);
  });
}

const extractData = response => (console.log(response.data), response.data);