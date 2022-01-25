import React, { useEffect, useState,forwardRef, useRef } from 'react';
import { BiCloudUpload, BiCog, BiSearchAlt2 } from "react-icons/bi";
import theme from '../theme';

function NavBar({playMusicRef},ref) {
    const themeLocaltorage=localStorage.getItem('activeTheme')
    const [activeTheme,setActiveTheme]=useState(parseInt(themeLocaltorage)||0)
    const bodyRef=useRef(document.querySelector('body'))
    console.log(' re render')
    useEffect(()=>{
        playMusicRef.current.style.backgroundImage=`url(${theme[activeTheme].playMusic})`
        bodyRef.current.style.backgroundImage=`url(${theme[activeTheme].url})`
        localStorage.setItem('activeTheme',activeTheme)
    },[activeTheme])
    const handleChangeTheme=()=>{
        if(activeTheme===theme.length-1){
            setActiveTheme(0)
        }
        else{
            setActiveTheme(activeTheme+1)
        }
    }
    return (
        <div className='nav-bar-menu' ref={ref}>
            <div className='nav-bar-menu-search'>
                <input type="text" name='search' placeholder='Nhập tên bài hát, nghệ sĩ, hoặc thể loại nhạc...'/>
                <BiSearchAlt2 className='search-icon'/>    
            </div>
            <div className='nav-bar-menu-sub'>
                <div className='nav-bar-menu-sub-item' onClick={handleChangeTheme}>
                    <img src="/img/newyear.png" alt="" />
                </div>
                <div className='nav-bar-menu-sub-item'>
                    <BiCloudUpload/>
                </div>
                <div className='nav-bar-menu-sub-item'>
                    <BiCog/>
                </div>
                <div className='nav-bar-menu-sub-item avatar'>
                    <img src="/user-default.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default forwardRef(NavBar);