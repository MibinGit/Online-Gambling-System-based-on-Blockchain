import {Component} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {getUserInfo} from '../redux/user.redux';
import {connect} from "react-redux";
@connect (
    state => state,
    {getUserInfo}
)

@withRouter
class CheckLogin extends Component {
    filterCheck = [
        "/login",
        "/register",
        "app"
    ];

    componentDidMount() {
        if(this.filterCheck.indexOf(this.props.location.pathname) > -1) {
            return;
        }
        axios.get('/user/info')
            .then(res => {
                if(res.status === 200) {
                    if(res.data.code === 0) {
                        this.props.getUserInfo(res.data.user)
                    }else {
                        this.props.history.push('/login')
                   }
               }
            })
    }
    render() {

        return null;
    }
}

export default CheckLogin;
