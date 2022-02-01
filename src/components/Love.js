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

import {BiSlideshow,BiDownload,BiBellMinus } from "react-icons/bi";

function Love({id,source}) {

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
                className="sub-menu"
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 50,
                    height: 50,
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
                        <div className='side-bar-menu-playlist' style={{marginRight:10}}>
                            <BiSlideshow className='fs-20'/>
                        </div>
                    </ListItemIcon>
                    <span className='word-space-normal'>
                        Thêm vào PlayList
                    </span>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <div 
                            className='side-bar-menu-playlist' 
                            style={{
                                marginRight:10, 
                                backgroundColor: '#0093E9',
                                backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
                                }
                        }>
                            <BiDownload className='fs-20'/>
                        </div>
                    </ListItemIcon>
                    <a href={source} download='test.mp3' className='word-space-normal'>
                        Tải nhạc
                    </a>
                </MenuItem>
                <MenuItem>
                <ListItemIcon>
                        <div 
                            className='side-bar-menu-playlist' 
                            style={{
                                marginRight:10, 
                                backgroundColor: '#21D4FD',
                                backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
                                }
                        }>
                            <BiBellMinus className='fs-20'/>
                        </div>
                    </ListItemIcon>
                    <span className='word-space-normal'>Theo dõi nghệ sĩ</span>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Love;