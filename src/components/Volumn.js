import React,{useEffect,useRef,useState} from 'react';
import { BsFillVolumeMuteFill,BsFillVolumeUpFill, BsDownload, BsHeadphones } from "react-icons/bs";
import Slider from '@mui/material/Slider';

function Volumn({songRef,source,view}) {
    const [isShowVolumn,setIsShowVolumn]=useState(false)
    const [isMuted,setIsMuted]=useState(false)
    const [volume,setVolume]=useState(100)
    const timerRef=useRef(null)
    console.log('Volumn re-render')
    useEffect(()=>{
        if(isShowVolumn){
            timerRef.current=setTimeout(()=>{
                setIsShowVolumn(false)
            },3000)
        }
        else{
            if(timerRef.current){
                clearTimeout(timerRef.current)
            }
        }
    },[isShowVolumn])
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }
    useEffect(()=>{
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        if(playMusic){
            songRef.current.volume=playMusic.volume
            setVolume(songRef.current.volume*100)
        }
        const handleClickWindow=(e)=>{
            let el=e.target.closest('.controller-right')
            if(!el){
                setIsShowVolumn(false)
            }
        }
        window.addEventListener('click',handleClickWindow)
        return ()=>{
            window.addEventListener('click',handleClickWindow)
        }
    },[])
    const handleVolumnChange=(e)=>{
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        if(playMusic){
            let newPlayMusic={
                ...playMusic,
                volume:e.target.value/100,
            }
            localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
        }
        if(timerRef.current){
            clearTimeout(timerRef.current)
        }
        songRef.current.volume=e.target.value/100
        setVolume(e.target.value)
        if(parseInt(e.target.value)===0){
            setIsMuted(true)
        }
        else{
            setIsMuted(false)
        }
        timerRef.current=setTimeout(()=>{
            setIsShowVolumn(false)
        },3000)
    }
    const handleMute=()=>{
        if(window.innerWidth<1025){
            return
        }
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        if(playMusic){
            let newPlayMusic={
                ...playMusic,
                volume:0,
            }
            localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
        }
        setIsMuted(true)
        setVolume(0)
        songRef.current.volume=0
    }
    const handleUnMute=()=>{
        if(window.innerWidth<1025){
            return
        }
        setIsMuted(false)
        setVolume(50)
        songRef.current.volume=0.5
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        if(playMusic){
            let newPlayMusic={
                ...playMusic,
                volume:0.5,
            }
            localStorage.setItem('playMusic',JSON.stringify(newPlayMusic))
        }
    }
    return (
        <>  
            <div className="view">
                <BsHeadphones className='icon-btn active'/>
                <div>
                    <span>{view}</span>
                    <span> views</span>
                </div>
            </div>
            <div className="btn-download">
                <BsDownload style={{marginRight:5,fontSize:16}}/>
                <a href={source} download='test.mp3'>
                    Tải nhạc
                </a>
            </div>
            <div style={{position:'relative'}}>
                {isMuted?
                <BsFillVolumeMuteFill 
                    style={{color:'white',zIndex:100000}} 
                    className='icon-btn'
                    onClick={handleUnMute}
                    onMouseOver={()=>{setIsShowVolumn(true)}}
                />:
                <BsFillVolumeUpFill 
                    style={{color:'white',zIndex:100000}} 
                    className='icon-btn'
                    onClick={handleMute}
                    onMouseOver={()=>{setIsShowVolumn(true)}}
                />
                }
                <Slider
                    className={isShowVolumn?'volumn-slider':'volumn-slider none'}
                    sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                    }}
                    orientation="vertical"
                    value={volume}
                    aria-label="Temperature"
                    onKeyDown={preventHorizontalKeyboardNavigation}
                    onChange={handleVolumnChange}
                />
            </div>
            
        </>
    );
}

export default Volumn;