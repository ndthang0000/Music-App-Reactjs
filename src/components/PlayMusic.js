import React,{forwardRef,useEffect,useRef,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AiFillAndroid, 
        AiFillBackward, 
        AiFillPlayCircle,
        AiFillForward, 
        AiFillDribbbleCircle,
        AiFillPauseCircle } from "react-icons/ai";
import AudioSong from './AudioSong';
import {nextSong, preSong} from '../redux/action'


function PlayMusic(props,ref) {
    const songRef=useRef(null)
    const [isPlaying,setIsPlaying]=useState(false)
    const dispath=useDispatch()
    console.log('re-render')
    const music=useSelector(state=>state.music) // array
    const indexCurrentSong=useSelector(state=>state.active)  // index of array
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
    return (
        <>
            <div className='play-music' ref={ref}>
                <div className="song-item-img">
                    <div className='song-item-img-area'>
                        <img src={currentSong.image} alt='' />
                    </div>
                    <div className="song-item-infor">
                        <div className='song-item-infor-name'>{currentSong.name}</div>
                        <div className='song-item-infor-singer'>{currentSong.singer}</div>
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
                        <AiFillDribbbleCircle className='icon-btn'/>
                    </div>
                    <div className='controller-mid-input'>
                        <AudioSong ref={songRef} currentSong={currentSong} isPlaying={isPlaying} />
                    </div>
                </div>
                <div className='controller-right'>
                    <div className='icon'>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default forwardRef(PlayMusic);