const GET_CONTRACT = 'GET_CONTRACT ';

let initState = {
    g0 : '',
    g0Address : '',
    admin : '',
    pool0 : 0,
    g0Stock : 0,
    wnum : 0,
    rows: [
        {num: '',addrs: []},
    ],

};

export function contract(state=initState,action) {
    switch(action.type) {
        case GET_CONTRACT :
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export function getContract(account) {

    return {
        type: GET_CONTRACT,
        payload: account
    }
}
