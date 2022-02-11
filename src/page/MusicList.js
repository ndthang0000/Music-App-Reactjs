import React from 'react';
import Wrapper from '../components/Wrapper';
import SongItem from '../components/SongItem'
import { useSelector,useDispatch } from 'react-redux';
import { playAnySong, deleteSongMusic } from '../redux/action/playMusic';
import { BsFillCollectionPlayFill } from "react-icons/bs";

function MusicList(props) {
    const music=useSelector(state=>state.playMusic.music)
    const isActive=useSelector(state=>state.playMusic.active)
    const dispatch=useDispatch()
    const handleChangeSong=(e,index)=>{
        let songItem=e.target.closest('.list-song-item')
        if(!songItem.classList.value.includes('active')){
            dispatch(playAnySong(index))
        }
    }
    return (
        <>
            <Wrapper>
                <h2 className='tittle-music'>Nhạc Đang Phát <BsFillCollectionPlayFill className='icon'/></h2>
                <div className='list-song'>
                    {music.map((item,index)=>
                        <SongItem 
                            data={item}
                            {...item} 
                            index={index} 
                            key={index} 
                            isActive={isActive} 
                            changeSong={handleChangeSong}
                            isRemove={true}
                            isEdit={true}
                        />
                    )}
                </div>
            </Wrapper>
        </>
    );
}

export default MusicList;