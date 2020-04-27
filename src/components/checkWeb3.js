import {Component} from 'react';
import {withRouter} from 'react-router';
import {getWeb3} from '../redux/web3.redux';
import {getContract} from '../redux/contract.redux';
import {connect} from 'react-redux';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract';
import gambling0Artifact from '../../build/contracts/gambling0.json';

const gambling0 = contract(gambling0Artifact);
@connect (
    state => state,
    {getWeb3,getContract}
)

@withRouter
class CheckWeb3 extends Component {
    componentDidMount(){
        var self = this;
        var web3 = new Web3('ws://localhost:7545');
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                let ethereum = window.ethereum;
                let userAddress;
                let balance;
                let web3Data;
                let contractData;
                let g0;
                let g0Address;
                let pool0;
                let props = this.props
                window.web3 = new Web3(ethereum);
                try {
                    // Request account access if needed
                    await ethereum.enable();
                    getWeb3Data(self.props)
                    // // web3
                    // await window.web3.eth.getAccounts(function (err, accs) {
                    //     userAddress = accs[0];
                    // });
                    // // console.log(userAddress)
                    // // await window.web3.eth.getBalance(userAddress, function (err, balc) {
                    // //     balance = balc;
                    // // });
                    // web3Data = {
                    //     'web3': window.web3,
                    //     'address': userAddress,
                    //     'balance': 1
                    // };
                    // props.getWeb3(web3Data);
                    // //contract
                    // await gambling0.setProvider(web3.currentProvider);
                    //
                    // await gambling0.deployed().then(function(instance){
                    //     g0 = instance;
                    //     g0Address = g0.address;
                    // });
                    // await window.web3.eth.getBalance(g0Address, function (err, balc) {
                    //     pool0 = balc;
                    // });
                    // contractData = {
                    //     'g0' : gambling0,
                    //     'g0Address' : g0Address,
                    //     'pool0' : pool0
                    // };
                    // props.getContract(contractData);
                    // window.web3.eth.sendTransaction({/* ... */});
                } catch (error) {
                    // User denied account access...
                }

            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
                window.web3.eth.sendTransaction({/* ... */});
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });

        window.ethereum.on('accountsChanged', function () {
            getWeb3Data(self.props)
        });
    }
    // getWeb3Data() {
    //     var props = this.props;
    //     var userAddress;
    //     var balance;
    //     var web3Data;
    //     var contractData;
    //     let g0;
    //     var g0Address;
    //     var pool0;
    //     var web3;
    //     if (window.ethereum) {
    //         let ethereum = window.ethereum;
    //         web3 = new Web3(ethereum);
    //     }
    //
    //     window.web3.eth.getAccounts(function (err, accs) {
    //         userAddress = accs[0];
    //         window.web3.eth.getBalance(userAddress, function (err, balc) {
    //             balance = balc;
    //             gambling0.setProvider(web3.currentProvider);
    //             gambling0.deployed().then(function (instance) {
    //                 g0 = instance;
    //                 g0Address = g0.address;
    //                 window.web3.eth.getBalance(g0Address, function (err, balc) {
    //                     pool0 = balc;
    //                     web3Data = {
    //                         'web3': window.web3,
    //                         'address': userAddress,
    //                         'balance': balance
    //                     };
    //                     contractData = {
    //                         'g0' : gambling0,
    //                         'g0Address': g0Address,
    //                         'pool0': pool0
    //                     };
    //                     props.getWeb3(web3Data);
    //                     props.getContract(contractData);
    //                 });
    //             });
    //         });
    //     });
    //
    // }
    render(){
        return null;
    }
}

export function getWeb3Data1(props){
    var userAddress;
    var balance;
    var web3Data;
    var contractData;
    let g0;
    let g0Address;
    let admin;
    var pool0;
    var web3;
    let wnum;

    if (window.ethereum) {
        let ethereum = window.ethereum;
        web3 = new Web3(ethereum);
    }

    window.web3.eth.getAccounts(function (err, accs) {
        userAddress = accs[0];
        window.web3.eth.getBalance(userAddress, function (err, balc) {
            balance = balc;
            gambling0.setProvider(web3.currentProvider);
            gambling0.deployed().then(function (instance) {
                g0 = instance;
                g0Address = g0.address;
                // window.web3.eth.getBalance(g0Address, function (err, balc) {
                g0.getMoneyNum.call({from:userAddress}).then(function (balc) {

                    pool0 = balc;
                    web3Data = {
                        'web3': window.web3,
                        'address': userAddress,
                        'balance': balance
                    };
                    contractData = {
                        'g0' : g0,
                        'g0Address': g0Address,
                        'pool0': pool0,
                    };
                    props.getWeb3(web3Data);
                    props.getContract(contractData);
                });

                // g0.getwin.call({from : userAddress}).then(function (num) {
                //     wnum = num
                //     web3Data = {
                //         'web3': window.web3,
                //         'address': userAddress,
                //         'balance': balance
                //     };
                //     contractData = {
                //         'g0' : g0,
                //         'g0Address': g0Address,
                //         'pool0': pool0,
                //         'wnum' : num
                //     };
                //     props.getWeb3(web3Data);
                //     props.getContract(contractData);
                // })
            });
        });
    });
}

export async function getWeb3Data(props){
    let userAddress;
    let balance;
    let web3Data;
    let contractData;
    let g0;
    let g0Address;
    let pool0;
    let web3;
    let wnum;

    if (window.ethereum) {
        let ethereum = window.ethereum;
        web3 = new Web3(ethereum);
    }

    await window.web3.eth.getAccounts(function (err, accs) {
        userAddress = accs[0];
    });

    // await window.web3.eth.getBalance(userAddress, function (err, balc) {
    //     balance = balc;
    // });

    await gambling0.setProvider(web3.currentProvider);
    await gambling0.deployed().then(function (instance) {
        g0 = instance;
        g0Address = g0.address;

    });
    // await window.web3.eth.getBalance(g0Address, function (err, balc) {
    //     pool0 = balc;
    // });
    await g0.getMoneyNum.call({from:userAddress}).then(function (balc) {
        pool0 = balc;
    });
    // await window.web3.eth.getwin()
    // await g0.getwin.call({from:userAddress}).then(function (num) {
    //     wnum = num
    // });
    await g0.getwin.call({from:userAddress}).then(function (num) {
        wnum = num
        web3Data = {
            'web3': window.web3,
            'address': userAddress,
            'balance': balance
        };
        contractData = {
            'g0' : g0,
            'g0Address': g0Address,
            'pool0': pool0,
            'wnum' : num
        };
        props.getWeb3(web3Data);
        props.getContract(contractData);
    });


    web3Data = {
        'web3': window.web3,
        'address': userAddress,
        'balance': balance
    };

    contractData = {
        'gambling0': gambling0,
        'g0' : g0,
        'g0Address': g0Address,
        'pool0': pool0,
        'wnum' : wnum
    };

    props.getWeb3(web3Data);
    props.getContract(contractData);


}
export default CheckWeb3;
