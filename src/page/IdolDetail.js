import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import { useParams } from 'react-router-dom';
import {getOneIdol} from '../api/idol'

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
                <h2 className='idol-tittle'>{user?.name}</h2>

            </div>
        </Wrapper>
    );
}

export default IdolDetail;