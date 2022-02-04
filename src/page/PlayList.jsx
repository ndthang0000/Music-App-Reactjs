import React, {useEffect, useState} from 'react';
import Wrapper from '../components/Wrapper';
import {useSelector} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {useNavigate} from 'react-router-dom'
import {BiSlideshow } from "react-icons/bi";
import PlayListItem from '../components/PlayListItem'
import {getAllPlayList} from '../api/user'
import { AiFillPlusCircle } from "react-icons/ai";

function PlayList(props) {
    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    const [playList,setPlayList]=useState([])
    useEffect(async()=>{
        if(!userInfo){
            return navigate('/not-login')
        }
        const data=await getAllPlayList({uid:userInfo.uid})
        if(data.success){
            setPlayList(data.allPlayList)
        }
    },[userInfo])
    return (
        <>
            <Wrapper>
                <div className="play-list">
                    <h1 className='play-list-tittle'>
                        <div className='side-bar-menu-playlist' style={{marginRight:10}}>
                            <BiSlideshow className='fs-20'/>
                        </div>
                        <span>PlayList Của Bạn</span>
                    </h1>
                    <div className="play-list-content">
                        <div className="row" style={{gap:20}}>
                            <div className="col-lg-3 col-md-4 col-sm-6 word-space-normal create-play-list">
                                <AiFillPlusCircle/>
                            </div>
                            {playList.map(item=>(
                                <div className="col-lg-3 col-md-4 col-sm-6 word-space-normal" key={item._id}>
                                    <PlayListItem {...item}/>
                                </div>))
                            }
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
}

export default PlayList;