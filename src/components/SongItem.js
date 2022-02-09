import React, { useEffect, useRef,useState } from 'react';
import { AiOutlineMore, AiOutlineDelete, AiTwotoneDelete } from "react-icons/ai";
import { BsFillCollectionPlayFill,BsHeadphones } from "react-icons/bs";
import color from '../color'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import {BiSlideshow,BiDownload,BiBellMinus } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import SimpleDialog from './SimpleDialog';
import env from "react-dotenv";
import {userInfor} from '../redux/selector/userInfor'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SongItem({love,source,_id:id,avatar,singerName,name,index,changeSong,isActive,view,isEdit,handleDeleteSong}) {
    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOpenDiaLog = () => {
        if(!userInfo){
            return navigate('not-login')
        }
        setIsOpen(true);
    };

    const handleCloseDiaLog = () => {
        setIsOpen(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const [openDelete,setOpenDelete]=useState(false)
    const handleOpenDeleteLog = () => {
        setOpenDelete(true);
    };
    
    const handleCloseDeleteLog = () => {
        setOpenDelete(false);
    };


    const listSongRef=useRef(null)
    useEffect(()=>{
        listSongRef.current.addEventListener('mouseover',(e)=>{
            listSongRef.current.querySelector('.song-item-img-area img').style.opacity='0.5'
            let El=listSongRef.current.querySelector('.play-btn')
            if(El){
                El.style.visibility='visible'
            }
        })
        listSongRef.current.addEventListener('mouseout',(e)=>{
            listSongRef.current.querySelector('.song-item-img-area img').style.opacity='1'
            let El=listSongRef.current.querySelector('.play-btn')
            if(El){
                El.style.visibility='hidden'
            }
        })
        return ()=>{
            //listSongRef.current.removeEventListener('mouseout')
            //listSongRef.current.removeEventListener('mouseover')
        }
    },[])
    const handleSendApiDeleteSong=async(e)=>{
        await handleDeleteSong(id); 
        handleCloseDeleteLog()
    }
    return (
        <div 
            className={isActive===index?'list-song-item active':'list-song-item'} 
            ref={listSongRef} 
            data-index={index}
        >
            <div className="song-item-img">
                <div className="index" style={{WebkitTextStrokeColor:color[index]||'#777'}}>
                    {index+1}
                </div>
                <div className='song-item-img-area'>
                    <img src={env.API_URL+avatar} alt='' />
                    {isActive===index?
                        (<i className='icon-playing'></i>):
                        (<BsFillCollectionPlayFill className='play-btn' onClick={changeSong}/>)
                    }
                </div>
                <div className="song-item-infor">
                    <div className='song-item-infor-name'>{name}</div>
                    <div className='song-item-infor-singer'>{singerName}</div>
                </div>
            </div>
            <div className='name' style={{fontWeight:300}}>
                {name}
            </div>
            <div className='song-item-control'>
                <div className='view'>
                    <BsHeadphones className='iconn'/>
                    <span>{view} view</span>
                </div>
                <div className='icon' onClick={handleClick}>
                    <AiOutlineMore />
                </div>
                {isEdit&&
                <div className='icon' style={{marginLeft:10}} onClick={handleOpenDeleteLog}>
                    <AiOutlineDelete />
                </div>
                }
            </div>
            <Dialog
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDeleteLog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='word-space-normal'>
                    <AiTwotoneDelete/>
                    "Bạn muốn xóa <span className='special-text'>{name}</span> ra khỏi PlayList?"
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className='word-space-normal'>
                        Bạn sẽ không thể khôi phục nếu nhấn Đồng Ý
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteLog} variant="outlined" color="error">Hủy bỏ</Button>
                    <Button onClick={handleSendApiDeleteSong} variant="contained" color="success" >Đồng Ý</Button>
                </DialogActions>
            </Dialog>

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

export default SongItem;