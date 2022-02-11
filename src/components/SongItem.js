import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import React, { useEffect, useRef, useState } from 'react';
import env from "react-dotenv";
import { AiOutlineDelete, AiOutlineMore, AiTwotoneDelete } from "react-icons/ai";
import { BiBellMinus, BiDownload, BiSlideshow } from "react-icons/bi";
import { BsFillCollectionPlayFill, BsHeadphones, BsHeartFill, BsMusicNoteList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import color from '../color';
import { deleteSongMusic, addReadyNextSong } from '../redux/action/playMusic';
import { userInfor } from '../redux/selector/userInfor';
import SimpleDialog from './SimpleDialog';
import Toastify from 'toastify-js'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SongItem({data,love,source,_id:id,avatar,singerName,name,index,changeSong,isActive,view,isEdit,handleDeleteSong,handleAppendPlaySong,isRemove}) {
    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isOpen, setIsOpen] = useState(false);

    const dispatch=useDispatch()

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
        if(!isRemove){
            await handleDeleteSong(id); 
        }
        else{
            dispatch(deleteSongMusic(id))
        }
        handleCloseDeleteLog()
    }
    const handleReadyNextSong=()=>{
        dispatch(addReadyNextSong(data))
        Toastify({
            text: name+" sẽ được phát kế tiếp",
            duration: 3000,
            avatar: env.API_URL+avatar,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }
    return (
        <div 
            className={isActive===index?'list-song-item active':'list-song-item'} 
            ref={listSongRef} 
        >
            <div className="song-item-img">
                <div className="index" style={{WebkitTextStrokeColor:color[index]||'#777'}}>
                    {index+1}
                </div>
                <div className='song-item-img-area'>
                    <img src={env.API_URL+avatar} alt='' />
                    {isActive===index?
                        (<i className='icon-playing'></i>):
                        (<BsFillCollectionPlayFill className='play-btn' onClick={(e)=>{if(changeSong){changeSong(e,index)} else {handleAppendPlaySong(index)} }}/>)
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
                    "Bạn muốn xóa <span className='special-text'>{name}</span> {!isRemove?'ra khỏi PlayList':'ra khỏi danh sách chờ'}?"
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
                <MenuItem onClick={handleReadyNextSong}>
                    <ListItemIcon>
                        <div 
                            className='side-bar-menu-playlist' 
                            style={{
                                    marginRight:10, 
                                    backgroundColor: '#3EECAC',
                                    backgroundImage: 'linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)'
                                }
                            }
                        >
                            <BsMusicNoteList className='fs-20'/>
                        </div>
                    </ListItemIcon>
                    <span className='word-space-normal'>
                        Phát tiếp theo
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