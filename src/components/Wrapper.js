import React from 'react';
import MainContent from '../components/MainContent';

function Wrapper({children}) {
    console.log('Wrapper re-render')
    const handleScrollNavBar=(value)=>{
        if(value){
            document.querySelector('.nav-bar-menu').classList.add('box-shadow-navbar')
        }
        else{
            document.querySelector('.nav-bar-menu').classList.remove('box-shadow-navbar')
        }
    }
    return (
        <>
            <MainContent handleScrollNavBar={handleScrollNavBar}>
                {children}
            </MainContent>
        </>
    );
}

export default Wrapper;