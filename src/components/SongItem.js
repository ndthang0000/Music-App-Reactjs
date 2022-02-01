import React, { useEffect, useRef } from 'react';
import { AiOutlineMore } from "react-icons/ai";
import { BsFillCollectionPlayFill,BsHeadphones } from "react-icons/bs";
import color from '../color'
import env from "react-dotenv";

function SongItem({avatar,singerName,name,index,changeSong,isActive}) {
    const listSongRef=useRef(null)
    useEffect(()=>{
        listSongRef.current.addEventListener('mouseover',(e)=>{
            listSongRef.current.querySelector('.song-item-img-area img').style.opacity='0.5'
            let El=listSongRef.current.querySelector('.play-btn')
            if(El){
                El.style.visibility='visible'
            }
        })
        listSongRef.current.addEventListener('mouseout',(e)=>{
            listSongRef.current.querySelector('.song-item-img-area img').style.opacity='1'
            let El=listSongRef.current.querySelector('.play-btn')
            if(El){
                El.style.visibility='hidden'
            }
        })
        return ()=>{
            //listSongRef.current.removeEventListener('mouseout')
            //listSongRef.current.removeEventListener('mouseover')
        }
    },[])
    return (
        <div 
            className={isActive===index?'list-song-item active':'list-song-item'} 
            ref={listSongRef} 
            data-index={index}
        >
            <div className="song-item-img">
                <div className="index" style={{WebkitTextStrokeColor:color[index]||'#777'}}>
                    {index+1}
                </div>
                <div className='song-item-img-area'>
                    <img src={env.API_URL+avatar} alt='' />
                    {isActive===index?
                        (<i className='icon-playing'></i>):
                        (<BsFillCollectionPlayFill className='play-btn' onClick={changeSong}/>)
                    }
                </div>
                <div className="song-item-infor">
                    <div className='song-item-infor-name'>{name}</div>
                    <div className='song-item-infor-singer'>{singerName}</div>
                </div>
            </div>
            <div className='name'>
                {name}
            </div>
            <div className='song-item-control'>
                <div className='view'>
                    <BsHeadphones className='iconn'/>
                    <span>354 views</span>
                </div>
                <div className='icon'>
                    <AiOutlineMore/>
                </div>
            </div>
        </div>
    );
}

export default SongItem;