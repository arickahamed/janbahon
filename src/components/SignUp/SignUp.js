import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase';
import "firebase/auth";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebaseConfig from '../FbGoogleSignIn/firebase.config';
import '../SignIn/SignIn.css';
import './SignUp.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        width: '90%',
        margin: "2%",
        },
    },
}));

// firebase authentication part
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const SignUp = () => {
    const classes = useStyles();
    
    // authentication part
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [success, setSuccess] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSingUpBtn = () => {
        user.confirmPassword === user.password ? firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
            console.log(res);
            setEmailError("");
            setPasswordError("");
            setSuccess(true);
            updateUserName(user.userName);
        })
        .catch((err) => {
            switch (err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    setSuccess(false);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    setSuccess(false);
                    break;
                default:
                    break;
            }
        }) : alert("1.Your username should be lower than 8 charecter 2. Password contain atleast 6 charecter including a number 3. You should confirm your password carefully!");
    } 

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        let fieldValid = true;
        if(e.target.name === "userName") {
            fieldValid = e.target.value.length > 0 && e.target.value.length < 8 && e.target.value !== ""; 
        }
        if(e.target.name === "email") {
            fieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === "password") {
            fieldValid =e.target.value.length > 5 && /\d{1}/.test(e.target.value);
        }
        if(e.target.name === "confirm-password") {
            fieldValid =e.target.value.length > 5 && /\d{1}/.test(e.target.value);
        }
        if(fieldValid) {
            let newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            // console.log(newUserInfo);
        }
    }

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name
        }).then(() => {
            console.log("user name updated successfully.")
        }).catch((error) => {
            console.log(error);
        }); 
    }
    
    return (
        <div className="main">
            <div className="signin-container">
                <form className={classes.root} noValidate autoComplete="off">
                    {success && <p style={{color: "green"}}>User Created Successfully now you can <Link to="/signin">Sign In</Link></p>}
                    <h3>Sign Up</h3>
                    <TextField 
                    name="userName"
                    className="input"
                    id="standard-basic-user" 
                    label="User Name"
                    placeholder="Not more than 7 charecter" 
                    required
                    onChange={handleChange}
                    />
                    <TextField 
                    name="email"
                    className="input" 
                    id="standard-basic-email" 
                    label="Email" 
                    placeholder="ex-'abcd@gmail.com'"
                    autofocus
                    required
                    onChange={handleChange}
                    />
                    <p className="error">
                        {emailError}
                    </p>
                    <TextField
                        name="password"
                        className="input"
                        id="standard-password-input"
                        label="Password"
                        placeholder="morethan 6 charecter and number"
                        type="password"
                        required
                        onChange={handleChange}
                        />
                    <p className="error">
                        {passwordError}
                    </p>
                    <TextField
                        name="confirmPassword"
                        className="input"
                        id="confirm-password-input"
                        label="Confirm Password"
                        placeholder={`same as password`}
                        type="password"
                        required
                        onChange={handleChange}
                        />
                        <Button className="signInBtn" variant="contained" color="primary" onClick={()=>handleSingUpBtn()}>
                            Sign Up
                        </Button>
                        {success && <p style={{color: "green"}}>User Created Successfully. 
                        Now go to log in and enjoy!</p>}
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;