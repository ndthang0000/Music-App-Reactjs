import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useParams } from 'react-router-dom';
import {getOneIdol} from '../api/idol'
import { BsFillHeartFill } from "react-icons/bs";

function IdolDetail(props) {
    const params=useParams()
    const [user,setUser]=useState()
    useEffect(async()=>{
        const res=await getOneIdol(params.email)
        setUser(res.idol)
    },[])
    return (
        <Wrapper>
            <div className='idol'>
                <img src={user?.photoURL} alt="" className='avatar'/>
                <h2 className='idol-tittle'>{user?.name}</h2>
                <div>
                    <p className='story'>{user?.story}</p>
                </div>
                <div style={{display:'flex'}}>
                    <div className='btn-follow'>
                        <BsFillHeartFill style={{color:'red',marginRight:10}}/>
                        Follow
                    </div>
                    <div className='quantity-follow'>
                        {user?.quantityFollower} người theo dõi
                    </div>
                </div>
                
            </div>
        </Wrapper>
    );
}

export default IdolDetail;