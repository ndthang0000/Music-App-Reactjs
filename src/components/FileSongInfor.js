import React, { useEffect } from 'react';

function FileSongInfor({name,size,type,setIsValid,isValid}) {
    useEffect(()=>{
        if(!type.includes('audio')){
            setIsValid({
                ...isValid,
                song:false
            })
        }
        else{
            setIsValid({
                ...isValid,
                song:true
            })
        }
    },[])
    return (
        <div className='text-white-sub' style={{flex:2}}>
            <div><span className='text-bold text-white'>Tên file : </span> {name}</div>
            <div><span className='text-bold text-white'>Kích thước : </span> {size}</div>
            <div><span className='text-bold text-white'>Loại tệp : </span> {type}</div>
            {!type.includes('audio')?
            (<div className='text-error'>Tệp không phải âm thanh</div>):
            (<div className='text-success'>Tệp hợp lệ</div>)}
        </div>
    );
}

export default FileSongInfor;