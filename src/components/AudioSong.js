import { forwardRef, useEffect,useState,useRef } from "react";
import { useDispatch } from "react-redux";

const formatTime=(e)=>{
    return `${Math.round(e/60-0.5)}:${Math.round(e%60)<10?'0'+Math.round(e%60):Math.round(e%60)}`
}
const clearTimer=(id)=>{
    if(id){
        clearInterval(id)
    }
}
function AudioSong({currentSong, isPlaying},ref) {
    const timeEl=useRef(null)
    const [time,setTime]=useState(0)
    const dispath=useDispatch()

    useEffect(()=>{
        if(isPlaying){
            timeEl.current=setInterval(()=>{
                setTime(((ref.current.currentTime/ref.current.duration)*100))
            },1000)
        }
        else{
            clearTimer(timeEl.current)
        }
    },[isPlaying])

    useEffect(()=>{
        setTime(0)
    },[currentSong])
    
    useEffect(()=>{
        ref.current.addEventListener('ended',(e)=>{

        })
    },[])
    const handleChangeInputRange=(e)=>{
        setTime(e.target.value)
        ref.current.currentTime=e.target.value/100*ref.current.duration
    }
    return (
        <>
            <audio ref={ref} src={currentSong.link} autoPlay={isPlaying}></audio>
            <span className='current-time'>{ref.current?formatTime(ref.current?.currentTime):'00:00'}</span>
            <input type="range" min={0} max={100} step={1} className='range-input' onChange={handleChangeInputRange} value={time}/>
            <span className='total-time'>{formatTime(300)}</span>
        </>
    );
}

export default forwardRef(AudioSong);