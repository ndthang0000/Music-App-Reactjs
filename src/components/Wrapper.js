import React, { useEffect, useRef } from 'react';
import MainContent from '../components/MainContent';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import PlayMusic from './PlayMusic';

function Wrapper({children}) {
    const navBarRef=useRef(null)
    const playMusicRef=useRef(null)
    const handleScrollNavBar=(value)=>{
        if(navBarRef.current){
            if(value){
                navBarRef.current.classList.add('box-shadow-navbar')
            }
            else{
                navBarRef.current.classList.remove('box-shadow-navbar')
            }
        }
    }
    return (
        <>
            <SideBar/>
            <NavBar ref={navBarRef} playMusicRef={playMusicRef}/>
            <PlayMusic ref={playMusicRef}/>
            <MainContent handleScrollNavBar={handleScrollNavBar}>
                {children}
            </MainContent>
        </>
    );
}

export default Wrapper;