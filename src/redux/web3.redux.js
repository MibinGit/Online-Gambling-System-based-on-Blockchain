const GET_ACCOUNT = 'GET_ACCOUNT';

let initState = {
    web3 : '',
    address: '',
    balance: 0
};

export function web3(state=initState,action) {
    switch(action.type) {
        case GET_ACCOUNT:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export function getWeb3(account) {

    return {
        type: GET_ACCOUNT,
        payload: account
    }
}
