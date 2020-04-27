import React, {Component} from 'react';
//import {List,InputItem,WingBlank,WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux'

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

import './login.css';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

@connect(
    state => state,
    {login}
)

class Login extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Welcome to Crypto Gambling
                    </Typography>
                    <br/>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={({ target: { value } })  => this.handleChange('username', value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={({ target: { value } })  => this.handleChange('password', value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleLogin.bind(this)}
                        >
                            Sign in
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href="javescript:void(0);"
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="javescript:void(0);"
                                    variant="body2"
                                    onClick={this.handleGoRegister.bind(this)}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </div>
                    <br/>
                    <br/>
                    {/*<Button onClick={this.handleGoRegister.bind(this)}>Don't have an account? Go to sign up</Button>*/}
                    <br/>
                    {/*<div className="err-show">{this.props.user.msg ? this.props.user.msg : ''}</div>*/}
                    {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}/>:null}
                </div>
            </Container>
        )
    }

    handleLogin() {
        this.props.login(this.state);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleGoRegister() {
        this.props.history.push('/register');
    }

}
export default withStyles(styles, { withTheme: true })(Login);