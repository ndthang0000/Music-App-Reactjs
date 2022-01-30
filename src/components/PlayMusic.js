import React,{memo,useEffect,useRef,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AiFillAndroid, 
        AiFillBackward, 
        AiFillPlayCircle,
        AiFillForward, 
        AiOutlineRetweet,
        AiFillPauseCircle } from "react-icons/ai";
import AudioSong from './AudioSong';
import Volumn from './Volumn';
import {getListSong,getPlayListSong} from '../api/songApi';
import {setList,nextSong, preSong} from '../redux/action/playMusic'
import env from "react-dotenv";


function PlayMusic(props) {
    const songRef=useRef(null)
    const [isPlaying,setIsPlaying]=useState(false)
    const dispath=useDispatch()
    console.log('re-render PlayMusic')

    const music=useSelector(state=>state.playMusic.music) // array
    const indexCurrentSong=useSelector(state=>state.playMusic.active)  // index of array
    const currentSong =music[indexCurrentSong]     // current song
    const handlePlayPauseSong=()=>{
        if(isPlaying){
            songRef.current.pause()
        }
        else{
            songRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }
    const handlePreviosSong=(e)=>{
        dispath(preSong())
        setIsPlaying(true)
    }
    
    const handleNextSong=()=>{
        dispath(nextSong())
        setIsPlaying(true)
    }
    const handleEndedSong=()=>{
        dispath(nextSong())
        setIsPlaying(true)
    }
    useEffect(async()=>{
        if(music.length===0){
            let playMusic=JSON.parse(localStorage.getItem('playMusic'))
            if(!playMusic){
                const data=await getListSong()
                let newPlayMusic={
                    volume:1,   // volume
                    currentSong:0, // currentSong
                    playList:'',     // '' is top 100 else is playList
                }
                localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
                dispath(setList({playList:data,index:0}))
            }
            else{
                if(!playMusic.playList){
                    const data=await getListSong()
                    dispath(setList({playList:data,index:playMusic.currentSong}))
                }
                else{
                    const data=await getPlayListSong(playMusic.playList)
                    if(data){
                        dispath(setList({playList:data,index:playMusic.currentSong}))
                    }
                    else{
                        const newData=await getListSong()
                        dispath(setList({playList:newData,index:playMusic.currentSong}))
                    }
                }
            }
        }
    },[])
    useEffect(()=>{
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        if(playMusic){
            let newPlayMusic={
                ...playMusic,
                currentSong:indexCurrentSong
            }
            localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
        }
    },[currentSong])
    return (
        <>
            <div className='play-music'>
                <div className="song-item-img">
                    <div className='song-item-img-area'>
                        <img src={env.API_URL+currentSong?.avatar} alt='' />
                    </div>
                    <div className="song-item-infor">
                        <div className='song-item-infor-name'>{currentSong?.name}</div>
                        <div className='song-item-infor-singer'>{currentSong?.singer}</div>
                    </div>
                </div>
                <div className='controller-mid'>
                    <div className='controller-mid-top'>
                        <AiFillAndroid className='icon-btn'/>
                        <AiFillBackward className='icon-btn' onClick={handlePreviosSong}/>
                        <div className="play">
                            <div className="player-inner" onClick={handlePlayPauseSong}>
                                {!isPlaying?
                                <AiFillPlayCircle style={{cursor:'pointer',fontSize:'20px',color:'red'}} />:
                                <AiFillPauseCircle style={{cursor:'pointer',fontSize:'20px',color:'red'}} />}
                            </div>
                        </div>
                        <AiFillForward className='icon-btn' onClick={handleNextSong}/>
                        <AiOutlineRetweet className='icon-btn active' title='Phát tuần tự'/>
                    </div>
                    <div className='controller-mid-input'>
                        <AudioSong 
                            ref={songRef} 
                            currentSong={currentSong} 
                            isPlaying={isPlaying} 
                            handleEndedSong={handleEndedSong}
                        />
                    </div>
                </div>
                <div className='controller-right'>
                    <Volumn 
                        songRef={songRef} 
                        source={env.API_URL+currentSong?.source}
                        name={currentSong?.name}
                    />
                </div>
            </div>
        </>
        
    );
}

export default memo(PlayMusic);