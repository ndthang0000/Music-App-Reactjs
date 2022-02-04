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
import { BsHeadphones,BsHeartFill } from "react-icons/bs";
import SimpleDialog from './SimpleDialog';
import env from "react-dotenv";

function Love({id,source,name,avatar,view,love}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOpenDiaLog = () => {
        setIsOpen(true);
    };

    const handleCloseDiaLog = () => {
        setIsOpen(false);
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
    },[id,userInfo])
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
            <SimpleDialog
                open={isOpen}
                onClose={handleCloseDiaLog}
                idSong={id}
                avatar={avatar}
                name={name}
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
                <MenuItem className='word-space-normal'>
                    <Avatar 
                        alt="Remy Sharp"
                        src={env.API_URL+avatar}
                        sx={{ width: 24, height: 24 }}
                    />
                    <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <div className='word-space-normal' style={{fontWeight:600}}>{name}</div>
                        <div style={{display:'flex',gap:10}}>
                            <div style={{display:'flex',alignItems:'center',gap:3}}>
                                <BsHeadphones style={{fontSize:18,color:'#747d8c'}}/>
                                <span style={{color:'#747d8c'}}>{view}</span>
                            </div>
                            <div style={{display:'flex',alignItems:'center',gap:3}}>
                                <BsHeartFill style={{fontSize:18,color:'#ff4757'}}/>
                                <span style={{color:'#ff4757'}}>{love}</span>
                            </div>
                        </div>
                    </div>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleOpenDiaLog}>
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