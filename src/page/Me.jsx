import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import {useSelector,useDispatch} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {useNavigate} from 'react-router-dom'
import {setUser} from '../redux/action/user'
import { getAuth, signOut } from "firebase/auth";
import {getAllPlayList} from '../api/user'
import {BiSlideshow } from "react-icons/bi";
import PlayListItem from '../components/PlayListItem'
import { AiFillPlusCircle } from "react-icons/ai";
import CreatePlayList from '../components/CreatePlayList';
import {setPlaylistAction} from '../redux/action/user'

function Me(props) {
    const playList=useSelector(state=>state.user.playList)
    console.log(playList)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const auth=getAuth()
    const userInfo=useSelector(userInfor)
    const dispath=useDispatch()
    const navigate=useNavigate()
    
    const handleLogout=()=>{
        signOut(auth).then(() => {
            navigate('/')
            dispath(setUser({user:null,playList:[]}))
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(async()=>{
        if(!userInfo){
            navigate('/not-login')
        }
        if(playList.length===0){
            const data=await getAllPlayList()
            if(data.success){
                dispath(setPlaylistAction(data.allPlayList))
            }
        }
    },[userInfo])
    return (
        <Wrapper>
                <div className='me-content'>
                    <div className="text-center">
                        <img src={userInfo?.photoURL} alt="" className='avatar-area'/>
                        <h2 className='name'>{userInfo?.displayName}</h2>
                        <div className='me-content-control'>
                            <div className='btn-upgrade vip'>Nâng cấp VIP</div>
                            <div className='btn-upgrade logout' onClick={handleLogout}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
                <div className="play-list">
                    <h1 className='play-list-tittle'>
                        <div className='side-bar-menu-playlist' style={{marginRight:10}}>
                            <BiSlideshow className='fs-20'/>
                        </div>
                        <span>PlayList Của Bạn</span>
                    </h1>
                    <div className="play-list-content">
                        <div className="row" style={{gap:20}}>
                            <div className="col-lg-3 col-md-4 col-sm-6 word-space-normal create-play-list"  onClick={handleClickOpen}>
                                <div className='add-area'>
                                    <AiFillPlusCircle className='icon-add'/>
                                    Tạo PlayList Mới
                                </div>
                            </div>
                            {playList?.map(item=>(
                                <div className="col-lg-3 col-md-4 col-sm-6 word-space-normal" key={item._id}>
                                    <PlayListItem {...item}/>
                                </div>))
                            }
                        </div>
                    </div>
                </div>
                <CreatePlayList open={open} handleClose={handleClose} userInfo={userInfo}/>
        </Wrapper>
    );
}

export default Me;