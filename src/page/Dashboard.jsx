import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import SongItem from '../components/SongItem'
import { BiLineChart } from "react-icons/bi";
import {getListSong} from '../api/songApi'
import {appendSongInList} from '../redux/action/playMusic'
import {useDispatch} from 'react-redux'
import SimpleImageSlider from 'react-simple-image-slider'
import {getNation} from '../api/songApi'
import env from 'react-dotenv';

function Dashboard(props) {
    const [music,setMusic]=useState([])
    const dispatch=useDispatch()
    useEffect(async()=>{
        const data=await getListSong()
        setMusic(data)
    },[])
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
        console.log(newImage)
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
            </Wrapper>
        </>
    );
}

export default Dashboard;