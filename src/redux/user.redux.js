import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const TODO_msgShow = 'TODO_msgShow';
const TODO_FAIL = 'TODO_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_SUCCESS_ADMIN = 'LOGIN_SUCCESS_ADMIN';
const GET_USER_INFO = 'GET_USER_INFO';
const LOGIN_OUT_SUCCESS = 'LOGIN_OUT_SUCCESS';
const RESET = 'RESET';
let initState = {
    redirectTo: '',
    username: '',
    password: '',
    repassword: '',
    type: '',
    msg: '',
    histories:[
        {
            date:'',
            number: '',
            address: ''
        },
    ],
    msgShow:false,
    isLogin: false
};

export function user(state=initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state,...action.payload, msg: '', redirectTo: '/login'};
        case TODO_msgShow:
            return {...state,...action.payload};
        case TODO_FAIL:
            return  {...state,...action.payload};
        case LOGIN_SUCCESS:
            return {...state,...action.payload, msg: '', redirectTo: '/app'};
        case LOGIN_SUCCESS_ADMIN:
            return {...state,...action.payload, msg: '', redirectTo: '/result'};
        case LOGIN_OUT_SUCCESS:
            return {...state,...action.payload};
        case GET_USER_INFO:
            return {...state,...action.payload};
        case RESET:
            return {...state,...action.payload};
        default:
            return state;
    }
}

function registerFail(data) {
    data.msgShow = true;
    return {
        payload:data,
        type: TODO_msgShow
    }
}

function registerSuccess(data) {
    return {
        payload:data,
        type: REGISTER_SUCCESS
    }
}

function toDoFail(data){
    data.msgShow = true;
    return {
        payload:data,
        type: TODO_FAIL
    }
}

function loginSuccess(data){
    if(data.type === 'admin')
    {
        return {
            payload:data,
            type: LOGIN_SUCCESS_ADMIN
        }
    }
    else
    {
        return {
            payload:data,
            type: LOGIN_SUCCESS
        }
    }
}

function loginOutSuccess(data) {
    data.msgShow = true;
    return {
        payload:data,
        type: LOGIN_OUT_SUCCESS
    }
}

export function reset(){
    let data = {
        msgShow : false
    }
    return {
        payload:data,
        type: RESET
    }
}

export function register({username,password,repassword,type}) {
    return dispatch => {
        if(!username || !password) {
            return dispatch(registerFail({msg:'Empty username or password.'}))
        }
        if(password !== repassword) {
            return dispatch(registerFail({msg:'Passwords do not match.'}))
        }

        axios.post('/user/register',{username,password,type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.user))
                }else {
                    dispatch(registerFail(res.data))
                }
            })
    }
}

export function login({username,password}) {
    if(!username || !password) {
        return toDoFail({msg:'Empty username or password.'})
    }
    return dispatch => {
        axios.post('/user/login',{username,password})
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    res.data.user.isLogin = true;
                    dispatch(loginSuccess(res.data.user))
                }else {
                    dispatch(toDoFail(res.data))
                }
            })
    }
}

export function getUserInfo(userInfo) {
    return {
        type: GET_USER_INFO,
        payload: userInfo

    }
}

export function loginOut() {
    return dispatch => {
        axios.get('/user/loginOut')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let delState = {
                        redirectTo: '/login',
                        username: '',
                        password: '',
                        repassword: '',
                        type: '',
                        msg: res.data.msg,
                        isLogin: false
                    };
                    dispatch(loginOutSuccess(delState))
                } else {
                    dispatch(toDoFail(res.data.message))
                }
            })
    }
}

export function pushHis(history) {
    return dispatch => {
        console.log(history);
        if(!history) {
            return dispatch(toDoFail({msg:'Empty history.'}))
        }
        axios.post('/user/pushHis', history)
            .then(res => {
                if (res.status === 200) {

                } else {
                    dispatch(toDoFail(res.data.message))
                }
            });
    }
}
