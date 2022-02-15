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
import {getListSong, getPlayListSong, getRecentlyListSong} from '../api/songApi';
import {setList,nextSong, preSong} from '../redux/action/playMusic'
import env from "react-dotenv";
import Love from './Love';

function PlayMusic(props) {
    const songRef=useRef(null)
    const [isPlaying,setIsPlaying]=useState(false)
    const [isRepeat,setIsRepeat]=useState(0)
    const dispath=useDispatch()
    console.log('re-render PlayMusic')
    const music=useSelector(state=>state.playMusic.music) // array
    const indexCurrentSong=useSelector(state=>state.playMusic.active)  // index of array
    const currentSong =music[indexCurrentSong]     // current song
    const isKeyboard=useSelector(state=>state.playMusic.isKeyboard)
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
    const handleRepeat=()=>{
        if(isRepeat===1){
            setIsRepeat(0)
        }
        else{
            setIsRepeat(1)
        }
    }
    const handleRandom=()=>{
        if(isRepeat===2){
            setIsRepeat(0)
        }else{
            setIsRepeat(2)
        }
    }
    useEffect(async()=>{
        if(music.length===0){
            let playMusic=JSON.parse(localStorage.getItem('playMusic'))
            const data=await getListSong()
            if(!playMusic){
                let temp=data.allSong.map(item=>item._id)
                let newPlayMusic={
                    volume:1,   // volume
                    currentSong:0, // currentSong
                    playList:temp,     // array
                }
                localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
                dispath(setList({playList:data.allSong,index:0}))
            }
            else{
                if(Array.isArray(playMusic.playList)&&playMusic.playList.length>0){
                    const listSong=await getRecentlyListSong({listSong:playMusic.playList})
                    dispath(setList({
                        playList:listSong.recentlySong,
                        index:playMusic.currentSong,
                    }))
                }
                else{
                    dispath(setList({
                        playList:data,
                        index:playMusic.currentSong,
                    }))
                }
                // else{
                //     const data=await getListSong()
                //     const listSong=await getRecentlyListSong(playMusic.playList)
                //     if(data){
                //         dispath(setList({
                //             playList:listSong.recentlySong,
                //             index:playMusic.currentSong,
                //             top100:data
                //         }))
                //     }
                //     // else{
                //     //     const newData=await getListSong()
                //     //     dispath(setList({playList:newData,index:playMusic.currentSong}))
                //     // }
                // }
            }
        }
    },[])
    useEffect(()=>{  // set index current song
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        if(playMusic){
            let newPlayMusic={
                ...playMusic,
                currentSong:indexCurrentSong
            }
            localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
        }
    },[currentSong])
    useEffect(()=>{  // recently list song
        if(currentSong){
            let recentlySong=JSON.parse(localStorage.getItem('recentlySong'))
            if(!recentlySong){
                recentlySong=[currentSong._id]
            }
            else{
                if(recentlySong.indexOf(currentSong._id)>=0){
                    recentlySong.splice(recentlySong.indexOf(currentSong._id),1)
                    recentlySong.unshift(currentSong._id)
                }
                else{
                    if(recentlySong.length>20){
                        recentlySong.pop()
                        recentlySong.unshift(currentSong._id)
                    }else{
                        recentlySong.unshift(currentSong._id)
                    }
                }
            }
            localStorage.setItem('recentlySong',JSON.stringify(recentlySong))
        }
        
    },[currentSong])
    useEffect(()=>{   // key board setting
        const handleKeyCode=(e)=>{
            if(e.target.nodeName==='BODY'){
                if(e.keyCode===32){
                    document.querySelector('.play').click()
                }
                if(e.keyCode===39){
                    handleNextSong()
                }
                if(e.keyCode===37){
                    handlePreviosSong()
                }
            }
        }
        if(isKeyboard){
            window.addEventListener('keyup',handleKeyCode)
        }else{
            window.removeEventListener('keyup',handleKeyCode)
        }
        return ()=>{
            window.removeEventListener('keyup',handleKeyCode)
        }
    },[isKeyboard]) 
    return (
        <>
            <div className='play-music'>
                <div className="song-item-img">
                    <div className='song-item-img-area'>
                        <img src={env.API_URL+currentSong?.avatar} alt='' />
                        <i className={isPlaying?'icon-playing':'none icon-playing'}></i>
                    </div>
                    <div className="song-item-infor">
                        <div className='song-item-infor-name'>{currentSong?.name}</div>
                        <div className='song-item-infor-singer'>{currentSong?.singerName}</div>
                    </div>
                    <Love 
                        id={currentSong?._id}
                        avatar={currentSong?.avatar}
                        name={currentSong?.name}
                        source={env.API_URL+currentSong?.source}
                        view={currentSong?.view}
                        love={currentSong?.love}
                    />
                </div>
                <div className='controller-mid'>
                    <div className='controller-mid-top'>
                        <AiFillAndroid 
                            className={isRepeat===2?'icon-btn active':'icon-btn'}
                            onClick={handleRandom}
                        />
                        <AiFillBackward className='icon-btn play-prev-song' onClick={handlePreviosSong}/>
                        <div className="play" onClick={handlePlayPauseSong}>
                            <div className="player-inner">
                                {!isPlaying?
                                <AiFillPlayCircle style={{cursor:'pointer',fontSize:'20px',color:'red'}} />:
                                <AiFillPauseCircle style={{cursor:'pointer',fontSize:'20px',color:'red'}} />}
                            </div>
                        </div>
                        <AiFillForward className='icon-btn play-next-song' onClick={handleNextSong}/>
                        <AiOutlineRetweet 
                            className={isRepeat===1?'icon-btn active':'icon-btn'} 
                            title='Phát lặp lại'
                            onClick={handleRepeat}
                        />
                    </div>
                    <div className='controller-mid-input'>
                        <AudioSong 
                            ref={songRef} 
                            currentSong={currentSong} 
                            isPlaying={isPlaying} 
                            handleEndedSong={handleEndedSong}
                            isRepeat={isRepeat}
                        />
                    </div>
                </div>
                <div className='controller-right'>
                    <Volumn 
                        songRef={songRef} 
                        source={env.API_URL+currentSong?.source}
                        name={currentSong?.name}
                        view={currentSong?.view}
                    />
                </div>
            </div>
        </>
        
    );
}

export default memo(PlayMusic);