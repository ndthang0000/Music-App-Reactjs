import React, { useEffect, useState, useRef } from 'react';
import Wrapper from '../components/Wrapper';
import SongItem from '../components/SongItem'
import { BiLineChart } from "react-icons/bi";
import {getListSong} from '../api/songApi'
import {appendSongInList} from '../redux/action/playMusic'
import {useDispatch} from 'react-redux'
import SimpleImageSlider from 'react-simple-image-slider'
import {getNation} from '../api/songApi'
import env from 'react-dotenv';
import Button from '@mui/material/Button';
import { BiShow } from "react-icons/bi";

function Dashboard(props) {
    const pageRef=useRef(1)
    const [music,setMusic]=useState([])
    const dispatch=useDispatch()
    useEffect(async()=>{
        const data=await getListSong(pageRef.current)
        console.log(data)
        if(data.success){
            pageRef.current+=1
            setMusic(data.allSong)
        }
    },[])
    const handleViewMoreSong=async()=>{
        const data=await getListSong(pageRef.current)
        if(data.success){
            pageRef.current+=1
            if(data.allSong.length>0){
                let newMusic=[...music,...data.allSong]
                setMusic(newMusic)
            }
        }
    }
    const handleAppendPlaySong=(index)=>{
        dispatch(appendSongInList(music[index]))
    }
    const [images,setImages]=useState([{url:''}])
    useEffect(async()=>{
        const data=await getNation()
        let newImage=data.allNation.map(item=>{
            return {
                url:env.API_URL+item.avatar
            }
        })
        setImages(newImage)
    },[])
    return (
        <>
            <Wrapper>
                <div className='text-center'>
                    <SimpleImageSlider
                        width={400}
                        height={200}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                    />
                </div>
                <h2 className='tittle-music'>Top 100 bài hát Hot nhất <BiLineChart className='icon'/></h2>
                <div className='list-song'>
                    {music.map((item,index)=><SongItem data={item} {...item} index={index} key={index} handleAppendPlaySong={handleAppendPlaySong} />)}
                </div>
                <div className='text-center'>
                    <Button variant="contained" startIcon={<BiShow />} className='word-space-normal' color='secondary' onClick={handleViewMoreSong}>
                        Xem thêm nhạc
                    </Button>
                </div>
            </Wrapper>
        </>
    );
}

export default Dashboard;