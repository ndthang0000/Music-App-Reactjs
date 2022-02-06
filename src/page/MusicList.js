import React from 'react';
import Wrapper from '../components/Wrapper';
import SongItem from '../components/SongItem'
import { useSelector,useDispatch } from 'react-redux';
import { playAnySong } from '../redux/action/playMusic';
import { BsFillCollectionPlayFill } from "react-icons/bs";

function MusicList(props) {
    const music=useSelector(state=>state.playMusic.music)
    const isActive=useSelector(state=>state.playMusic.active)
    const dispath=useDispatch()
    const handleChangeSong=(e)=>{
        let songItem=e.target.closest('.list-song-item')
        if(!songItem.classList.value.includes('active')){
            dispath(playAnySong(songItem.dataset.index))
        }
    }
    return (
        <>
            <Wrapper>
                <h2 className='tittle-music'>Phát nhạc <BsFillCollectionPlayFill className='icon'/></h2>
                <div className='list-song'>
                    {music.map((item,index)=><SongItem {...item} index={index} key={index} isActive={isActive} changeSong={handleChangeSong}/>)}
                </div>
            </Wrapper>
        </>
    );
}

export default MusicList;