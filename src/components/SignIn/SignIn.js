import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase';
import 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import FbGoogleSignIn from '../FbGoogleSignIn/FbGoogleSignIn';
import firebaseConfig from '../FbGoogleSignIn/firebase.config';
import './SignIn.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        width: '90%',
        margin: "2%",
        },
    },
}));

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const SignIn = () => {
    const classes = useStyles();

    // authentication part
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [success, setSuccess] = useState(false);

    // Route part
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [signedInUser, setSignedInUser] = useContext(UserContext);


    const handleSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const {displayName, email} = res.user;
            // console.log(displayName,email);
            const loggedInUser = {nickName : displayName, email};
            setSignedInUser(loggedInUser);
            setSuccess(true);
            setEmailError("");
            setPasswordError("");
            history.replace(from);
        })
        .catch((err) => {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    setSuccess(false);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    setSuccess(false);
                    break;
                default:
                    break;
            }
        });
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="main">
            <div className="signin-container">
                <form className={classes.root} noValidate autoComplete="off">
                    {success && <p style={{color: "green"}}>Logged In Successfully.</p>}
                    <h3>Sign In</h3>
                    <TextField 
                    className="input" 
                    id="standard-basic" 
                    label="Email"
                    required 
                    value={email}
                    onChange={emailHandler}
                    />
                    <p style={{color: "red"}}>{emailError}</p>
                    <TextField
                        className="input"
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={passHandler}
                    />
                    <p style={{color: "red"}}>{passwordError}</p>
                    <div className="bottom-part">
                        <div className="check-box">
                            <input type="checkbox" />
                            <label htmlFor="">Remember me</label>
                        </div>
                        <div className="anchor">
                            <Link to="/signup">Forgot Password</Link>
                        </div>
                    </div>
                    <Button className="signInBtn" variant="contained" color="primary" onClick={handleSignIn}>
                        Sign In
                    </Button>
                    <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
            <FbGoogleSignIn />
        </div>
    );
};

export default SignIn;