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

const extractData = response => (console.log(response.data), response.data);