import React, {Component, Fragment} from 'react';
//import {List,InputItem,WingBlank,WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {login, loginOut} from '../../redux/user.redux'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Web3 from 'web3';
import './result.css';
import CheckWeb3, {getWeb3Data} from "../../components/checkWeb3";
import {getWeb3} from "../../redux/web3.redux";
import {getContract} from "../../redux/contract.redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
    div: {
        display: 'inline-block',
        width: '220px',
        margin: theme.spacing(1),
    },
    div1: {
        // display: 'inline-block',
        width: '60%',
        marginLeft: '20%',
        marginTop: '20px',
    },
    div2: {
        // display: 'inline-block',
        width: '80%',
        marginLeft: '15%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none"
        }
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
    heroContent: {
        padding: theme.spacing(8, 0, 6)
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700]
    },
    cardPricing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2)
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6)
        }
    }
});



@connect(
    state => state,
    {
        getWeb3,
        loginOut,
        getContract
    }
)
class Result extends Component {


    componentWillMount() {
        this.setState({isLoading: true})
    }

    render() {
        const { classes } = this.props;
        let pool0 = (parseFloat(this.props.contract.pool0) / 1000000000000000000).toFixed(15);
        let winum = parseFloat(this.props.contract.wnum);
        let rows = this.props.contract.rows
        let userAddress = this.props.web3.address;
        return (
            <Fragment>
                <CssBaseline />
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
                            Admin Page
                        </Typography>
                        <nav>
                            <Link
                                variant="button"
                                color="textPrimary"
                                href="/Show"
                                className={classes.link}
                            >
                                Show
                            </Link>
                            <Link
                                variant="button"
                                color="textPrimary"
                                href="/result"
                                className={classes.link}
                            >
                                Result
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

                <div className={classes.div1}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        Gambling0 Dashboard
                    </Typography>
                    <CardActionArea component="a" href="#">
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>

                                    <Typography variant="subtitle1" color="textSecondary">
                                        <br/> Prize pool: <label id="rest">{pool0}ETH</label>
                                        <br/> Winning Number: <label id="win">{winum}</label>
                                        <br/> Current Address: <label id="addr">{userAddress}</label>
                                        {/*<br/>Win: <label id="bal">{fixedBalance} ETH</label>*/}
                                        {/*<br/>Purchase quantity:<label id="pur">{g0Stock} ETH</label>*/}
                                    </Typography>
                                </CardContent>
                            </div>

                        </Card>
                    </CardActionArea>
                {/*</div>*/}

                <span id='status'/>
                <br/>
                <div className={classes.div2}>
                <div className={classes.div}>
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        id="end"
                        onClick={this.end0.bind(this)}
                    >
                        End
                    </Button>
                </div>

                <div className={classes.div}>
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        id="result"
                        onClick={this.show_win.bind(this)}
                    >
                        Get Result
                    </Button>
                </div>

                <div className={classes.div}>
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        id="des"
                        onClick={this.dess.bind(this)}
                    >
                        Destroy
                    </Button>
                </div>
                </div>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                <TableCell>Addresses</TableCell>
                                <TableCell>Prize</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody id='tableBody'>
                            {rows.map((row) => (
                                <TableRow key={row.num}>
                                    <TableCell component="th" scope="row">
                                        {row.num}
                                    </TableCell>
                                    <TableCell >
                                        {row.addrs.map((addr) => (
                                            <p>{addr}</p>
                                        ))}
                                    </TableCell>
                                    <TableCell >
                                        {row.addrs.map((addr) => (
                                            <p>{parseFloat(pool0/row.addrs.length).toFixed(10)}</p>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>

            </Fragment>
        )
    }

    handleLogout() {
        this.props.loginOut()
    }

    setStatus(message) {
        const status = document.getElementById('status')
        status.innerHTML = message
    }

    async show_win(){
        let rows = []
        let g0 = this.props.contract.g0
        let userAddress = this.props.web3.address
        let winum = parseFloat(this.props.contract.wnum);
            await g0.getMap.call(winum, {from: userAddress}).then(function (addrs) {
                rows.push({
                    num : winum,
                    addrs : addrs,
                });
                console.log(addrs)
            });


        let contractData = {
            'rows' : rows
        };

        this.props.getContract(contractData)
    }

    dess() {
        const self = this
        this.setStatus('Destroying... (please wait)')
        let account = this.props.web3.address
        let g0 = this.props.contract.g0
        g0.des({ from: account
        }).then(function(){
            self.setStatus('Destroy successfully!')
        }).catch(function(e){
            console.log(e)
            self.setStatus('Error ending; see log.')
        });
    }

    end0(){
        const self = this
        this.setStatus('Ending... (please wait)')
        let account = this.props.web3.address
        let g0 =  this.props.contract.g0
        g0.endd({from: account}).then(function () {
            getWeb3Data(self.props);
            self.setStatus('Ending successfully!')
        }).catch(function (e) {
            console.log(e)
            self.setStatus('Error ending; see log.')
        })
    }

    setStatus(message) {
        const status = document.getElementById('status')
        status.innerHTML = message
    }

}
export default withStyles(styles, { withTheme: true })(Result);
