import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Wrapper from './Wrapper';
import {getDetailPlayList} from '../api/user'
import moment from 'moment'
import SongItem from './SongItem';
import { BsFillFileEarmarkExcelFill, BsController, BsFillPencilFill } from "react-icons/bs";
import {useSelector, useDispatch} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import CreatePlayList from '../components/CreatePlayList';
import {setList} from '../redux/action/playMusic'
import {getAllPlayList} from '../api/user'
import {setPlaylistAction} from '../redux/action/user'

function PlayListDetail(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispath=useDispatch()
    const handleClose = () => {
        setOpen(false);
    };
    const userInfo=useSelector(userInfor)
    const [playlist,setPlaylist]=useState({playList:{},listSong:[]})
    const params=useParams()
    useEffect(async()=>{
        const data=await getDetailPlayList(params.id)
        if(data.success){
            setPlaylist({playList:data.playList,listSong:data.listSong})
            const res=await getAllPlayList()
            if(res.success){
                dispath(setPlaylistAction(res.allPlayList))
            }
        }
    },[])
    const handlePlayPlayList=()=>{
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        let randomNumber=Math.floor(Math.random() * playlist.listSong.length);
        playMusic.playList=playlist.playList._id
        playMusic.currentSong=playlist.randomNumber
        localStorage.setItem('playMusic',JSON.stringify(playMusic))
        dispath(setList({playList:playlist.listSong,index:randomNumber}))
    }
    const handleEditName=async(slug)=>{
        let data=await getDetailPlayList(slug)
        if(data.success){
            setPlaylist({playList:data.playList,listSong:data.listSong})

        }
    }
    return (
        <Wrapper>
            <div className="row play-list-detail">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <img src={playlist.playList?.avatar} alt="" className='img'/>
                    <div className='name' style={{fontWeight:600}}>
                        {playlist.playList?.name}
                        <BsFillPencilFill style={{marginLeft:10,cursor:'pointer'}} onClick={handleClickOpen}/>
                    </div>
                    <div className='time'>Tạo lúc : {moment(playlist.playList?.createdAt).format('LL')}</div>
                    <div className='time'>{playlist.playList?.isPublic?'Công Khai':'Riêng Tư'}</div>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                    <div className='btn-play-all' onClick={handlePlayPlayList}>
                    <BsController className='icon-play'/>Phát Ngẩu Nhiên tất cả</div>
                    <div className='list-song'>
                        {playlist.listSong.length>0?
                        playlist.listSong.map((item,index)=><SongItem {...item} index={index} key={index} active={-1}/>):
                        (<div className='empty-song'>
                            <BsFillFileEarmarkExcelFill className='icon'/>
                            Chưa có bài hát nào
                        </div>)
                        }
                    </div>
                </div>
            </div>
            <CreatePlayList 
                open={open} 
                handleClose={handleClose} 
                userInfo={userInfo}
                defaultValue={playlist.playList.name}
                defaultIsPublic={playlist.playList.isPublic}
                _id={playlist.playList._id}
                handleEditName={handleEditName}
                edit
            />
        </Wrapper>
    );
}

export default PlayListDetail;