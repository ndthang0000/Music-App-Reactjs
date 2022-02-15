import React, { useEffect, useState,forwardRef, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { BiCloudUpload, BiCog, BiSearchAlt2, } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import {userInfor} from '../redux/selector/userInfor'
import theme from '../theme';
import {searchSong} from '../api/songApi'
import env from 'react-dotenv';
import {appendSongInList} from '../redux/action/playMusic'
import {useDispatch} from 'react-redux'

function NavBar(props,ref) {
    const themeLocaltorage=localStorage.getItem('activeTheme')
    const [activeTheme,setActiveTheme]=useState(parseInt(themeLocaltorage)||0)

    const userInfo=useSelector(userInfor)

    const dispatch=useDispatch()
    const bodyRef=useRef(document.querySelector('body'))
    const inputRef=useRef(null)
    const timer=useRef()
    const [isDisplaySearch,setIsDisplaySearch]=useState(false)
    const [searchData,setSearchData]=useState([])
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
    const handleAppendSong=(index)=>{
        dispatch(appendSongInList(searchData[index]))
        setIsDisplaySearch(false)
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
    useEffect(()=>{
        inputRef.current.addEventListener('input',(e)=>{
            setIsDisplaySearch(inputRef.current.value===''?false:true)
            if(timer.current){
                clearTimeout(timer.current)
            }
            timer.current=setTimeout(async()=>{
                if(inputRef.current.value){
                    const res=await searchSong({key:inputRef.current.value})
                    if(res.success){
                        setSearchData(res.newListSong)
                    }
                }
            },500)
        })
        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.nav-bar-menu-search')){
                setIsDisplaySearch(false)
            }
        })
    },[])
    return (
        <div className='nav-bar-menu' ref={ref}>
            <div className='menu-icon' onClick={handleToggleSideBar}>
                <BsList/>
            </div>
            <form className='nav-bar-menu-search' autoComplete='off' onSubmit={(e)=>e.preventDefault()}>
                <input type="text" name='search' placeholder='Nhập tên bài hát, nghệ sĩ...' ref={inputRef} />
                <ul className={isDisplaySearch?'search-sub-menu':'search-sub-menu ds-none'}>
                    {searchData.map((item,index)=>
                        <li style={{display:'flex',alignItems:'center'}} key={item._id} onClick={()=>handleAppendSong(index)}>
                            <BiSearchAlt2 style={{marginRight:10}}/>
                            <div style={{width:35,height:35,overflow:'hidden',marginRight:10}}>
                                <img src={env.API_URL+item.avatar} alt="" width='100%' />
                            </div>
                            {item.name} | {item.singerName}
                        </li>
                    )}
                    {searchData.length===0&&(<li>Khong co ket qua nao</li>)}
                </ul>
                <BiSearchAlt2 className='search-icon'/>    
            </form>
            <div className='nav-bar-menu-sub'>
                <div className='nav-bar-menu-sub-item' onClick={handleChangeTheme}>
                    <img src="/img/newyear.png" alt="" />
                </div>
                <Link to='/me/upload' style={{color:'white'}}>
                    <div className='nav-bar-menu-sub-item'>
                        <BiCloudUpload/>
                    </div>
                </Link>
                <Link to='/set-up' style={{color:'white'}}>
                    <div className='nav-bar-menu-sub-item'>
                        <BiCog/>
                    </div>
                </Link>
                <Link to={userInfo?'/me':'/login'} className='nav-bar-menu-sub-item avatar'>
                    <img src={userInfo?userInfo.photoURL:"/user-default.png"} alt="" />
                </Link>
            </div>
        </div>
    );
}

export default memo(forwardRef(NavBar));