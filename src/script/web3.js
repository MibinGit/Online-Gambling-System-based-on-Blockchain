import Web3 from 'web3';
import gambling0Artifact from '../../build/contracts/gambling0.json'
import { default as contract } from 'truffle-contract'

var web3 = new Web3('https://mainnet.infura.io/');//mainnet

const gambling0 = contract(gambling0Artifact)

function getContract(web3){
    gambling0.setProvider(web3.currentProvider);
    return gambling0;
}

//get current address
function getCurrentAccount(web3){
    let accounts = web3.eth.getAccounts().then(console.log)
    return accounts[0];
}
