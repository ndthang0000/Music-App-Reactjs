
import Wrapper from '../components/Wrapper';
import React,{useState, useEffect} from 'react';
import {getAllIdol} from '../api/idol'


import Idol from '../components/Idol'


export default function Idols({}) {
    
    const [idol,setIdol]=useState([])
    useEffect(async()=>{
        const data=await getAllIdol()
        if(data.success){
            setIdol(data.allIdol)
        }
    },[])
    
    return (
        <Wrapper>
            <div className="row">
            {idol.map(item=>
                <Idol {...item} key={item._id}/>
            )}
            </div>
        </Wrapper>
    );
}
