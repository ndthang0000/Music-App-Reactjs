import React, {useEffect} from 'react';
import UpLoad from '../components/UpLoad';
import Wrapper from '../components/Wrapper';
import {useSelector} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {useNavigate} from 'react-router-dom'

function UploadSong(props) {
    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!userInfo){
            navigate('/not-login')
        }
    },[])
    return (
        <>
            <Wrapper>
                <UpLoad/>
            </Wrapper>
        </>
    );
}

export default UploadSong;