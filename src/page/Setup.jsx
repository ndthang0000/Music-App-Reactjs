import React, {useState, useEffect} from 'react';
import Wrapper from '../components/Wrapper';
import {BsFillKeyboardFill, BsPhoneLandscapeFill, BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill} from "react-icons/bs";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useSelector,useDispatch} from 'react-redux'
import {setKeyboard} from '../redux/action/playMusic'


function Setup(props) {
    const [checked,setChecked]=useState(false)
    const isKeyboard=useSelector(state=>state.playMusic.isKeyboard)
    console.log(isKeyboard)
    const dispath=useDispatch()
    const handleChecked=()=>{
        localStorage.setItem('setting',JSON.stringify({keyboard:!checked}))
        dispath(setKeyboard(!checked))
        setChecked(!checked)
    }
    useEffect(()=>{
        setChecked(isKeyboard)
    },[])
    return (
        <Wrapper>
        <div className='set-up'>
            <h2 className='set-up-tittle'>
                <BsFillKeyboardFill className='icon'/>
                Bật chế độ sử dụng bàn phím
                <div className='checked'>
                    <FormControlLabel
                        control={
                            <Switch checked={checked} color="warning" onChange={handleChecked} />
                        }
                        label={checked?'Bật':'Tắt'}
                    />
                </div>
                
            </h2>
            {checked&&
                <div className='set-up-content'>
                    <div className='set-up-content-item'>
                        <span className='guide'>
                        <BsPhoneLandscapeFill className='icon'/>
                        Space 
                        </span>
                            : Play/Pause bài hát
                    </div>
                    <div className='set-up-content-item'>
                        <span className='guide'>
                        <BsFillArrowRightSquareFill className='icon'/>
                        Right Arrow 
                        </span>
                            : Chuyển sang bài hát tiếp theo
                    </div>
                    <div className='set-up-content-item'>
                        <span className='guide'>
                        <BsFillArrowLeftSquareFill className='icon'/>
                        Left Arrow 
                        </span>
                            : Chuyển sang bài hát trước đó
                    </div>
                </div>
            }
            
        </div>
        </Wrapper>
    );
}

export default Setup;