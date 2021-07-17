import React, { useState } from 'react';
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
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { actionLogin } from "../actions/ActionAuth";
import { Randompic } from '../styles';
import { Redirect } from "react-router-dom";


export const login_theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#002884',
            dark: '#002884',
            contrastText: '#000',
        },
        secondary: {
            light: '#ca61ff',
            main: '#f4c836',
            dark: '#ab7003',
            contrastText: '#000',
        },
    },
});


const useStyles = makeStyles((theme) => ({
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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginForm = ({ onLogin, auth }) => {
    const classes = useStyles();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    if (auth.token) {
        return <Redirect to="/feed" />
    }

    return (
        <MuiThemeProvider theme={login_theme}>
            <Container maxWidth="md">
                <CssBaseline />
                <Box display="flex" flexDirection="row">
                    <Box className={classes.paper} mr={3} width="50%">
                        <Randompic />
                    </Box>
                    <Box className={classes.paper} width="50%">
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={login} onChange={(e) => setLogin(e.target.value)}
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
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Box mt={2} mb={2}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => onLogin(login, password)}
                                >
                                    Sign in
                                </Button>
                            </Box>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/registration" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Container>
        </MuiThemeProvider>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


const CLoginForm = connect(mapStateToProps, { onLogin: actionLogin })(LoginForm);

export const PageLogin = () => (
    <div className="PageLogin">
        <CLoginForm />
    </div>
);
