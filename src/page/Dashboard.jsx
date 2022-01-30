import React from 'react';
import Wrapper from '../components/Wrapper';
import SongItem from '../components/SongItem'
import { useSelector,useDispatch } from 'react-redux';
import { playAnySong } from '../redux/action/playMusic';

function Dashboard(props) {
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
                <div className='list-song'>
                    {music.map((item,index)=><SongItem {...item} index={index} key={index} isActive={isActive} changeSong={handleChangeSong}/>)}
                </div>
            </Wrapper>
        </>
    );
}

export default Dashboard;