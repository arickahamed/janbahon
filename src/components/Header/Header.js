import { Button } from '@material-ui/core';
import firebase from 'firebase';
import 'firebase/auth';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from '../FbGoogleSignIn/firebase.config';
import './Header.css';

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Header = () => {
    const userName = useContext(UserContext);
    // console.log(userName,userName[0].nickName, userName.length);
    const handleSingOutBtn = () => {
        firebase.auth().signOut()
        .then(() => {
            console.log("sign out button clicked");
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="header-container">
            <div className="logo">
                <h2>JANBAHON</h2>
                <h4 className="user-name">{userName[0].nickName}</h4>
            </div>
            <nav className="navbar">
                <ul className="navbar-ul">
                    <li>
                        <Link className="navbar-link" to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/contact">Contact</Link>
                    </li>
                    <li>
                        {
                            userName[0].nickName === undefined ? <Link className="navbar-link" to="/signin">
                                    <Button variant="contained" color="primary">
                                        Sign In
                                    </Button>
                                </Link> : <Button onClick={handleSingOutBtn} variant="contained" color="primary">
                                        Sign Out
                                    </Button>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;