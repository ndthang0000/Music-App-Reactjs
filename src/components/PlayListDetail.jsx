import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Wrapper from './Wrapper';
import {getDetailPlayList} from '../api/user'
import moment from 'moment'
import SongItem from './SongItem';
import { BsFillFileEarmarkExcelFill, BsController } from "react-icons/bs";

function PlayListDetail(props) {
    const [playlist,setPlaylist]=useState({playList:{},listSong:[]})
    const params=useParams()
    useEffect(async()=>{
        const data=await getDetailPlayList(params.id)
        if(data.success){
            setPlaylist({playList:data.playList,listSong:data.listSong})
        }
    },[])
    const handlePlayPlayList=()=>{

    }
    return (
        <Wrapper>
            <div className="row play-list-detail">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <img src={playlist.playList?.avatar} alt="" className='img'/>
                    <div className='name' style={{fontWeight:600}}>
                        {playlist.playList?.name}
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
        </Wrapper>
    );
}

export default PlayListDetail;