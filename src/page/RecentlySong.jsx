import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import SongItem from '../components/SongItem'
import {getRecentlyListSong} from '../api/songApi'
import { BsFillCollectionPlayFill } from "react-icons/bs";

function RecentlySong(props) {
    const [recentlySong,setRecentlySong]=useState([])
    useEffect(async()=>{
        let recentlySong=JSON.parse(localStorage.getItem('recentlySong'))
        if(recentlySong){
            console.log(' sao dko vo day v')
            let res=await getRecentlyListSong({listSong:recentlySong})
            if(res.success){
                setRecentlySong(res.recentlySong)
            }
        }
    },[])
    return (
        <>
            <Wrapper>
                <h2 className='tittle-music'>Top 20 Bài Nhạc Nghe Gần Đây <BsFillCollectionPlayFill className='icon'/></h2>
                <div className='list-song'>
                    {recentlySong.map((item,index)=><SongItem {...item} index={index} key={index}/>)}
                </div>
            </Wrapper>
        </>
    );
}

export default RecentlySong;