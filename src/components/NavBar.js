import React, { useEffect, useState,forwardRef, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { BiCloudUpload, BiCog, BiSearchAlt2, } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import {userInfor} from '../redux/selector/userInfor'
import theme from '../theme';


function NavBar(props,ref) {
    const themeLocaltorage=localStorage.getItem('activeTheme')
    const [activeTheme,setActiveTheme]=useState(parseInt(themeLocaltorage)||0)


    const userInfo=useSelector(userInfor)


    const bodyRef=useRef(document.querySelector('body'))
    console.log('Navbar re-render')
    useEffect(()=>{
        document.querySelector('.play-music').style.backgroundImage=`url(${theme[activeTheme].playMusic})`
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
    const handleToggleSideBar=()=>{
        document.querySelector('.side-bar-menu').classList.add('visible-sidebar')
    }
    useEffect(()=>{
        const handleSidebar=(e)=>{
            let targetEl=e.target.closest('.side-bar-menu')
            let menuEl=e.target.closest('.menu-icon')
            if(menuEl){
                return
            }
            if(!targetEl){
                document.querySelector('.side-bar-menu').classList.remove('visible-sidebar')
            }
        }
        window.addEventListener('click',handleSidebar)
    },[])
    return (
        <div className='nav-bar-menu' ref={ref}>
            <div className='menu-icon' onClick={handleToggleSideBar}>
                <BsList/>
            </div>
            <div className='nav-bar-menu-search'>
                <input type="text" name='search' placeholder='Nhập tên bài hát, nghệ sĩ...'/>
                <BiSearchAlt2 className='search-icon'/>    
            </div>
            <div className='nav-bar-menu-sub'>
                <div className='nav-bar-menu-sub-item' onClick={handleChangeTheme}>
                    <img src="/img/newyear.png" alt="" />
                </div>
                <Link to='/song/upload' style={{color:'white'}}>
                    <div className='nav-bar-menu-sub-item'>
                        <BiCloudUpload/>
                    </div>
                </Link>
                <div className='nav-bar-menu-sub-item'>
                    <BiCog/>
                </div>
                <Link to={userInfo?'/me':'/login'} className='nav-bar-menu-sub-item avatar'>
                    <img src={userInfo?userInfo.photoURL:"/user-default.png"} alt="" />
                </Link>
            </div>
        </div>
    );
}

export default memo(forwardRef(NavBar));