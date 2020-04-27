import React, {Component,Fragment} from 'react';
//import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {loginOut} from './redux/user.redux';
import {pushHis} from './redux/user.redux';
import {getWeb3} from "./redux/web3.redux";
import {getContract} from './redux/contract.redux';

import {getWeb3Data} from './components/checkWeb3';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';

import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Web3 from 'web3';
import { default as contract } from 'truffle-contract';
import gambling0Artifact from '../build/contracts/gambling0.json';

import Toolbar from "@material-ui/core/Toolbar";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from "@material-ui/core/AppBar";

const gambling0 = contract(gambling0Artifact);
const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginLeft: '30%',
        alignItems: 'center',
    },
    div: {
        display: 'inline-block',
        width: '220px',
        margin: theme.spacing(1),
        marginLeft: '30%',
        alignItems: 'center',
    },
    container: {
        // margin: theme.spacing(100),
        align : "center",
        marginLeft: '400px'
    },
    buttongroup:{
        marginLeft: '100px'
    },
    div1:{
        marginLeft:'100px',
        width:'800px'
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
        flexWrap: "wrap"
    },
    toolbarTitle: {
        flexGrow: 1
    },
    link: {
        margin: theme.spacing(1, 1.5)
    },
});

@connect(
    state => state,
    {
        getWeb3,
        loginOut,
        getContract,
        pushHis
    }
)

class App extends Component {
    render() {
        const { classes } = this.props;
        let address = this.props.web3.address;
        let g0Stock = (parseFloat(this.props.contract.g0Stock) / 1000000000000000000).toFixed(15);
        let pool0 = (parseFloat(this.props.contract.pool0) / 1000000000000000000).toFixed(15);
        let fixedBalance = (parseFloat(this.props.web3.balance) / 1000000000000000000).toFixed(15);
        return (
            <Fragment>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.toolbarTitle}
                        >
                            App Page
                        </Typography>
                        <nav>
                            <Link
                                variant="button"
                                color="textPrimary"
                                href="/App"
                                className={classes.link}
                            >
                                Gambling0
                            </Link>
                            <Link
                                variant="button"
                                color="textPrimary"
                                href="/history"
                                className={classes.link}
                            >
                                History
                            </Link>
                        </nav>
                        <Button
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                            onClick={this.handleLogout.bind(this)}
                        >
                            Log Out
                        </Button>
                        {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}/> : null}
                    </Toolbar>
                </AppBar>

                <Container component="main" maxWidth="s">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <React.Fragment>
                            <Toolbar className={classes.toolbar}>
                                <Typography
                                    component="h2"
                                    variant="h5"
                                    color="inherit"
                                    align="center"
                                    noWrap
                                    className={classes.toolbarTitle}
                                >
                                    Gambling0
                                </Typography>
                            </Toolbar>
                        </React.Fragment>
                        <span id='status'/>

                        <div className={classes.div1}>
                            <CardActionArea component="a" href="#">
                                <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                <br/>Prize pool: <label id="rest">{pool0} ETH</label>
                                                <br/> Address: <label id="addr">{address}</label>
                                                {/*<br/>Balances: <label id="bal">{fixedBalance} ETH</label>*/}
                                                {/*<br/>Purchase quantity:<label id="pur">{g0Stock} ETH</label>*/}
                                            </Typography>
                                        </CardContent>
                                    </div>

                                </Card>
                            </CardActionArea>
                        </div>

                        <div className={classes.form}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="bet0num"
                                    name="gussNum"
                                    label="GuessNum"
                                    fullWidth
                                    autoComplete="fname"
                                    onChange={({ target: { value } })  => this.handleChange('number', value)}
                                />
                            </Grid>
                        </div>
                        <br/>
                        <div className={classes.div1}>
                            <div className={classes.div}>
                                <Button
                                    className={classes.submit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"

                                    onClick={this.bet0.bind(this)}
                                >
                                    Bet!
                                </Button>
                            </div>
                            {/*<div className={classes.div}>*/}
                            {/*    <Button*/}
                            {/*        className={classes.submit}*/}
                            {/*        type="submit"*/}
                            {/*        fullWidth*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        id="end"*/}
                            {/*        onClick={this.end0.bind(this)}*/}
                            {/*    >*/}
                            {/*        End(admin only)*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            {/*<div className={classes.div}>*/}
                            {/*    <Button*/}
                            {/*        className={classes.submit}*/}
                            {/*        type="submit"*/}
                            {/*        fullWidth*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        id="des"*/}
                            {/*        onClick={this.dess.bind(this)}*/}
                            {/*    >*/}
                            {/*        Destroy(admin only)*/}
                            {/*    </Button>*/}
                            {/*</div>*/}

                            {/*<div className={classes.div}>*/}
                            {/*    <Button*/}
                            {/*        className={classes.submit}*/}
                            {/*        type="primary"*/}
                            {/*        fullWidth*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        onClick={this.handleLogout.bind(this)}*/}
                            {/*    >*/}
                            {/*        log out*/}
                            {/*    </Button>{this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}/> : null}*/}

                            {/*</div>*/}
                        </div>

                        {/*<React.Fragment>*/}
                        {/*    <Toolbar className={classes.toolbar}>*/}
                        {/*        <Typography*/}
                        {/*            component="h2"*/}
                        {/*            variant="h5"*/}
                        {/*            color="inherit"*/}
                        {/*            align="center"*/}
                        {/*            noWrap*/}
                        {/*            className={classes.toolbarTitle}*/}
                        {/*        >*/}
                        {/*            Gambling1*/}
                        {/*        </Typography>*/}
                        {/*    </Toolbar>*/}
                        {/*</React.Fragment>*/}
                        {/*<div className={classes.div1}>*/}
                        {/*    <CardActionArea component="a" href="#">*/}
                        {/*        <Card className={classes.card}>*/}
                        {/*            <div className={classes.cardDetails}>*/}
                        {/*                <CardContent>*/}

                        {/*                    <Typography variant="subtitle1" color="textSecondary">*/}
                        {/*                        <h2><span className="black">This game can <span id="able">not</span> be played now.</span></h2>*/}
                        {/*                    </Typography>*/}
                        {/*                </CardContent>*/}
                        {/*            </div>*/}

                        {/*        </Card>*/}
                        {/*    </CardActionArea>*/}
                        {/*</div>*/}
                        {/*<div className={classes.div1}>*/}
                        {/*    <div className={classes.div}>*/}
                        {/*        <Button*/}
                        {/*            className={classes.submit}*/}
                        {/*            type="primary"*/}
                        {/*            fullWidth*/}
                        {/*            variant="contained"*/}
                        {/*            color="primary"*/}
                        {/*            onClick={this.handleLogout.bind(this)}*/}
                        {/*            id="bet1"*/}
                        {/*        >*/}
                        {/*            Bet!*/}
                        {/*        </Button>*/}
                        {/*    </div>*/}
                        {/*    <div className={classes.div}>*/}
                        {/*        <Button*/}
                        {/*            className={classes.submit}*/}
                        {/*            type="primary"*/}
                        {/*            fullWidth*/}
                        {/*            variant="contained"*/}
                        {/*            color="primary"*/}
                        {/*            onClick={this.handleLogout.bind(this)}*/}
                        {/*            id="ini"*/}
                        {/*        >*/}
                        {/*            Initialize(admin only)*/}
                        {/*        </Button>*/}
                        {/*    </div>*/}
                        {/*    <div className={classes.div}>*/}
                        {/*        <Button*/}
                        {/*            className={classes.submit}*/}
                        {/*            type="primary"*/}
                        {/*            fullWidth*/}
                        {/*            variant="contained"*/}
                        {/*            color="primary"*/}
                        {/*            onClick={this.handleLogout.bind(this)}*/}
                        {/*            id="take"*/}
                        {/*        >*/}
                        {/*            Take(admin only)*/}
                        {/*        </Button>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                    </div>
                </Container>
            </Fragment>
        );
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogout() {
        this.props.loginOut()
    }

    setStatus(message) {
        const status = document.getElementById('status')
        status.innerHTML = message
    }

    bet0() {
        const self = this
        let web3 = this.props.web3.web3
        let account = this.props.web3.address
        // let gambling0 = this.props.contract.g0
        const num = parseInt(document.getElementById('bet0num').value);
        self.setStatus('Betting... (please wait)')
        let g0 = this.props.contract.g0
        g0.bet(num, {value: web3.utils.toWei('1', 'ether'), from: account
        }).then(function () {
            let number = document.getElementById('bet0num').value;
            let history = {
                'address' : self.props.web3.address,
                'number' : number

            }
            self.props.pushHis(history);
            self.setStatus('Bet successfully!')
            getWeb3Data(self.props);
        }).catch(function (e) {
            console.log(e)
            self.setStatus('Error bet0; see log.')
        })
    }

    // end0(){
    //     const self = this
    //     this.setStatus('Ending... (please wait)')
    //     let account = this.props.web3.address
    //     let g0 =  this.props.contract.g0
    //     g0.endd({from: account}).then(function () {
    //         getWeb3Data(self.props);
    //             self.setStatus('Ending successfully!')
    //         }).catch(function (e) {
    //             console.log(e)
    //             self.setStatus('Error ending; see log.')
    //     })
    // }
    //
    //
    // dess() {
    //     const self = this
    //     this.setStatus('Destroying... (please wait)')
    //     let account = this.props.web3.address
    //     let g0 = this.props.contract.g0
    //     g0.des({ from: account
    //     }).then(function(){
    //         self.setStatus('Destroy successfully!')
    //     }).catch(function(e){
    //         console.log(e)
    //         self.setStatus('Error ending; see log.')
    //     });
    // }
}


export default withStyles(styles, { withTheme: true })(App);