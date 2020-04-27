import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//css
import './index.css';

//components
import CheckLogin from './components/checkLogin';
import CheckWeb3 from "./components/checkWeb3";
import App from './App';
//containers
import Login from './containers/login/login';
import Register from './containers/register/register';
import Show from './containers/show/show';
import Result from './containers/result/result';
import Appbar from './containers/Appbar'
import * as serviceWorker from './serviceWorker';

import reducer from './reducer';
import AlertDialog from "./components/alertDialog";
import userHistory from "./containers/history/userHistory";

const store = createStore(reducer, compose(
    applyMiddleware(thunk), //解决redux异步问题
    window.devToolsExtension ? window.devToolsExtension() : f => f // chrome控制台redux工具
));
export function getStore(){
    return store;

}
// ReactDOM.render(<Appbar />, document.querySelector('#bar'));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="react-login-register">
                <CheckLogin/>
                <CheckWeb3 id='checkWeb3'/>
                <AlertDialog/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/app' component={App}/>
                <Route path='/show' component={Show}/>
                <Route path='/result' component={Result}/>
                <Route path='/history' component={userHistory}/>
            </div>
        </Router>
    </Provider>,
    document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

