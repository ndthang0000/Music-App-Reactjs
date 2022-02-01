import React,{useEffect, useState} from 'react';
import { BsFillHeartFill,BsHeart,BsThreeDots } from "react-icons/bs";
import {getIsLove,setLove} from '../api/songApi'
import {useSelector} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Love({id}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isLove,setIsLove]=useState(false)
    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    useEffect(async()=>{
        if(id&&userInfo){
            const data=await getIsLove({idSong:id,uidUser:userInfo.uid})
            setIsLove(data.isLove)
        }
    },[id])
    const handleSetLove=async(e)=>{
        if(!userInfo){
            return navigate('/not-login')
        }
        e.target.style.pointerEvents='none'
        e.target.style.cursor='noDrop'
        const data=await setLove({idSong:id,uidUser:userInfo.uid})
        e.target.style.pointerEvents='auto'
        e.target.style.cursor='pointer'
        setIsLove(data.isLove)
    }
    return (
        <div className='like-infor'>
            {isLove?
            <BsFillHeartFill className='icon heart-fill' onClick={handleSetLove}/>:
            <BsHeart className='icon heart-none' onClick={handleSetLove}/>
            }
            <BsThreeDots 
                className='icon threedot'
                onClick={handleClick}
            />
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar />
                    My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Love;