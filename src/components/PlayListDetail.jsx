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
import {deleteSongFromPlayList} from '../api/user'
import {appendSongInList} from '../redux/action/playMusic'

function PlayListDetail(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch=useDispatch()
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
            console.log(res)
            if(res.success){
                dispatch(setPlaylistAction(res.allPlayList))
            }
        }
    },[])
    const handlePlayPlayList=()=>{
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        let randomNumber=Math.floor(Math.random() * playlist.listSong.length);
        playMusic.currentSong=randomNumber
        localStorage.setItem('playMusic',JSON.stringify(playMusic))
        dispatch(setList({
            playList:playlist.listSong,
            index:randomNumber
        }))
    }
    const handleEditName=async(slug)=>{
        let data=await getDetailPlayList(slug)
        if(data.success){
            setPlaylist({playList:data.playList,listSong:data.listSong})

        }
    }
    const handleDeleteSong=async(songId)=>{
        const res=await deleteSongFromPlayList({songId:songId,playListId:playlist.playList._id})
        let newListSong=playlist.listSong.filter(item=>item._id!==songId)
        if(res.success){
            setPlaylist({playList:res.playList,listSong:newListSong})
        }
    }
    const handleAppendPlaySong=(index)=>{
        dispatch(appendSongInList(playlist.listSong[index]))
    }
    return (
        <Wrapper>
            <div className="row play-list-detail">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <img src={playlist.playList?.avatar} alt="" className='img'/>
                    <div className='name' style={{fontWeight:600}}>
                        {playlist.playList?.name}
                        <BsFillPencilFill style={{marginLeft:10,cursor:'pointer',color:'#fa8231'}} onClick={handleClickOpen}/>
                    </div>
                    <div className='time'>T???o l??c : {moment(playlist.playList?.createdAt).format('LL')}</div>
                    <div className='time'>{playlist.playList?.isPublic?'C??ng Khai':'Ri??ng T??'}</div>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                    <div className='btn-play-all' onClick={handlePlayPlayList}>
                        <BsController className='icon-play'/>
                        Ph??t Ng???u Nhi??n t???t c???
                    </div>
                    <div className='list-song'>
                        {playlist.listSong.length>0?
                        playlist.listSong.map((item,index)=><SongItem data={item} {...item} index={index} key={index} active={-1} isEdit handleDeleteSong={handleDeleteSong} handleAppendPlaySong={handleAppendPlaySong}/>):
                        (<div className='empty-song'>
                            <BsFillFileEarmarkExcelFill className='icon'/>
                            Ch??a c?? b??i h??t n??o
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