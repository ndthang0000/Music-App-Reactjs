import React, {useEffect, useRef } from 'react';

function MainContent({children,handleScrollNavBar},) {
    const contentRef=useRef(null)
    console.log('Main-content re-render')
    useEffect(()=>{
        contentRef.current.addEventListener('scroll',(e)=>{
            if(e.target.scrollTop>80){
                handleScrollNavBar(true)
            }
            else{
                handleScrollNavBar(false)
            }
        })
        // return ()=>{
        //     contentRef.current.removeEventListener('scroll')
        // }
    },[])
    return (
        <div className='main-content' ref={contentRef}>
            {children}
        </div>
    );
}

export default MainContent;