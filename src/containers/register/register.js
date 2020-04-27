import React, {Component} from 'react';
//import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
//@material-ui
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
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//componenet
import AlertDialog from "../../components/alertDialog";
//css
import './register.css'

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

@connect(
    state => state,
    {register}
)

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            type: 'player',
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <div className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        autoComplete="fname"*/}
                            {/*        name="firstName"*/}
                            {/*        variant="outlined"*/}
                            {/*        required*/}
                            {/*        fullWidth*/}
                            {/*        id="firstName"*/}
                            {/*        label="First Name"*/}
                            {/*        autoFocus*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        variant="outlined"*/}
                            {/*        required*/}
                            {/*        fullWidth*/}
                            {/*        id="lastName"*/}
                            {/*        label="Last Name"*/}
                            {/*        name="lastName"*/}
                            {/*        autoComplete="lname"*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Username"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={({ target: { value } })  => this.handleChange('username', value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={({ target: { value } })  => this.handleChange('password', value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Confirm password"
                                    type="password"
                                    id="repassword"
                                    autoComplete="current-password"
                                    onChange={({ target: { value } })  => this.handleChange('repassword', value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleRegister.bind(this)}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="javascript:void(0);" variant="body2" onClick={this.handleGoLogin.bind(this)}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                    {/*<AlertDialog/>*/}
                    {/*<div className="err-show">{this.props.user.msg ? this.props.user.msg : ''}</div>*/}
                    {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}/>:null}
                </div>
            </Container>
            // <div className="page-register">
            //     <List>
            //         <InputItem onChange={value => this.handleChange('username', value)}>Username</InputItem>
            //         <InputItem onChange={value => this.handleChange('password', value)}>Password</InputItem>
            //         <InputItem onChange={value => this.handleChange('repassword', value)}>Re-Password</InputItem>
            //     </List>
            //     <WhiteSpace/>
            //     <List>
            //         <RadioItem onClick={() => this.handleChange('type', 'admin')} checked={this.state.type === 'admin'}>Admin</RadioItem>
            //         <RadioItem onClick={() => this.handleChange('type', 'player')} checked={this.state.type === 'player'}>Player</RadioItem>
            //     </List>
            //     <WhiteSpace/>
            //     <WhiteSpace/>
            //     <WhiteSpace/>
            //     <WingBlank>
            //         <button type="primary" onClick={this.handleRegister.bind(this)}>Sign up</button>
            //         <WhiteSpace/>
            //         <button onClick={this.handleGoLogin.bind(this)} type="primary">Already have an account? Go sign in.</button>
            //     </WingBlank>
            //     <div className="err-show">{this.props.user.msg ? this.props.user.msg : ''}</div>
            //     {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}/>:null}
            // </div>
        )
    }

    handleGoLogin() {
        this.props.history.push('/login')
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        this.props.register(this.state)
    }
}

export default withStyles(styles, { withTheme: true })(Register);
