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
import './history.css';
import CheckWeb3, {getWeb3Data} from "../../components/checkWeb3";
import {getWeb3} from "../../redux/web3.redux";
import {getContract} from "../../redux/contract.redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const styles = (theme) => ({
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
class UserHistory extends Component {

    componentWillMount() {
        this.setState({isLoading: true})
    }

    render() {
        let rows = this.props.user.histories;
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
                                    Lottery History
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
                                                {/*<br/>Prize pool: <label id="rest">{pool0} ETH</label>*/}
                                                {/*<br/>Address: <label id="addr">{address}</label>*/}
                                                {/*<br/>Balances: <label id="bal">{fixedBalance} ETH</label>*/}
                                                <br/>Purchase quantity:<label id="pur">{parseFloat(rows.length).toFixed(10)} ETH</label>
                                            </Typography>
                                        </CardContent>
                                    </div>

                                </Card>
                            </CardActionArea>

                            <div className={classes.form}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Number</TableCell>
                                                <TableCell >Addresses</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id='tableBody'>
                                            {rows.map((row) => (
                                                <TableRow key={row.date}>
                                                    <TableCell component="th" scope="row">
                                                        {this.handleDate(row.date)}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.number}
                                                    </TableCell>
                                                    <TableCell >
                                                        {row.address}
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </Container>
            </Fragment>
        );
    }

    handleLogout() {
        this.props.loginOut()
    }

    handleDate(string){
        return string.slice(0, 19).replace("T"," ");
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

}
export default withStyles(styles, { withTheme: true })(UserHistory);
