import React, { useEffect } from 'react';

function FileImageInfor({name,url,type,setIsValid,isValid}) {
    useEffect(()=>{
        if(!type.includes('image')){
            setIsValid({
                ...isValid,
                image:false
            })
        }
        else{
            setIsValid({
                ...isValid,
                image:true
            })
        }
    },[])
    return (
        <div className='text-white-sub' style={{flex:2}}>
            <div className='review-image'>
                <img src={url} width="100%" height="auto" />
            </div>
            <div><span className='text-bold text-white'>Tên file : </span> {name}</div>
            {!type.includes('image')?
            (<div className='text-error'>Tệp không phải hình ảnh</div>):
            (<div className='text-success'>Tệp hợp lệ</div>)}
        </div>
    );
}

export default FileImageInfor;