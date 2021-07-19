import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import './FbGoogleSignIn.css';
import firebaseConfig from './firebase.config';

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const FbGoogleSignIn = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [signedInUser, setSignedInUser] = useContext(UserContext);
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
            const {displayName, email} = result.user;
            const nickName = displayName.split(" ").find(name => name.length > 3);
            // console.log(nickName);
            const loggedInUser = {fullName: displayName, nickName,  email};
            setSignedInUser(loggedInUser);
            history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log("errorMessage",errorMessage);
            });
    }

    const handleGoogleSignIn = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const nickName = displayName.split(" ").find(name => name.length > 3);
            // console.log(nickName);
            const loggedInUser = {fullName: displayName, nickName,  email};
            setSignedInUser(loggedInUser);
            history.replace(from);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log("errorMessage",errorMessage);
        });
    }

    return (
        <div>
            <div onClick={handleFbSignIn} className="icon-container facebook">
                <FaFacebook />
                <h5 className="icon-name">Continue with facebook</h5>
            </div>
            <div onClick={handleGoogleSignIn} className="icon-container google">
                <FcGoogle />
                <h5 className="icon-name">Continue with facebook</h5>
            </div>
        </div>
    );
};

export default FbGoogleSignIn;