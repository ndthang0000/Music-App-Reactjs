import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {follow,isFollow} from '../api/user'

function Follow(props) {
    const navigate =useNavigate()
    const userInfo=useSelector(userInfor)
    
    useEffect(async()=>{
        const res=await isFollow(props.id)
        props.setCheckFollow(res.isFollow)
    },[])
    const handleFollow=async(e)=>{
        if(!userInfo){
            return navigate('/not-login')
        }
        if(props.checkFollow){
            return
        }
        const res=await follow(props.id)
        if(res.success){
            props.setCheckFollow(res.isFollow)
        }
    }
    let colored=props.checkFollow?'red':'#b2bec3'
    return (
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={handleFollow}>
                <FavoriteIcon style={{color:colored}}/>
            </IconButton>
            <span>{props.checkFollow?'Đã Theo dõi':'Theo dõi'}</span>
        </CardActions>
    );
}

export default Follow;