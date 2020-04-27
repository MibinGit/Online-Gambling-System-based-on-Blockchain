import {combineReducers} from 'redux'

import {user} from './redux/user.redux'
import {web3} from './redux/web3.redux'
import {contract} from './redux/contract.redux'

export default combineReducers({web3,user,contract})
