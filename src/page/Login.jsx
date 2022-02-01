import React, { useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import SignInScreen from '../firebase/SignInScreen';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'

function Login({}) {
    const navigate =useNavigate()
    const userInfo=useSelector(userInfor)
    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[])
    return (
        <Wrapper>
            <div className="login">
                <h3 className='text-center text-white'>Đăng nhập ngay</h3>
                <div className='text-center text-white-sub sub-tittle'>Bạn sẽ được sử dụng các tính năng cao cấp khi đăng nhập</div>
                <SignInScreen/>
            </div>
        </Wrapper>
    );
}

export default Login;