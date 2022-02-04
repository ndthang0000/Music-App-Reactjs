import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import {useSelector} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {useNavigate} from 'react-router-dom'
import Me from '../page/Me';
import UploadSong from '../page/UploadSong'

function MeRoute(props) {
    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!userInfo){
            navigate('/')
        }
    },[userInfo])
    return (
        <>
            <Route path="/me" element={<Me />}>
                <Route path="upload" element={<UploadSong />} />
            </Route>
        </>
    );
}

export default MeRoute;