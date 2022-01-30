import React, { useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import SignInScreen from '../firebase/SignInScreen';
import { useNavigate } from "react-router-dom";

function Login({isSignedIn}) {
    const navigate =useNavigate()
    return (
        <Wrapper>
            <SignInScreen/>
        </Wrapper>
    );
}

export default Login;