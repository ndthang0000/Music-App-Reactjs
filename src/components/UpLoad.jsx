import React, { useRef, useState } from 'react';
import Toastify from 'toastify-js'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsMusicNoteBeamed, BsCardImage } from "react-icons/bs";
import FileSongInfor from '../components/FileSongInfor'
import FileImageInfor from '../components/FileImageInfor'
import { useForm } from "react-hook-form";
import {upload,getListSong} from '../api/songApi'
import {useDispatch } from 'react-redux';
import {appendSongInList} from '../redux/action/playMusic'
import "toastify-js/src/toastify.css"
import env from "react-dotenv";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function UpLoad(props) {
    const dispath=useDispatch()
    const [song,setSong]=useState(null)
    const [image,setImage]=useState(null)
    const [isValid,setIsValid]=useState({song:false,image:false})
    const [open, setOpen] = useState(false);
    const [singerName,setSingerName]=useState('')
    const [name,setName]=useState('')
    const urlRef=useRef(null)
    const tempAudioRef=useRef(null)
    const { register, handleSubmit } = useForm();

    const styleButton=()=>{
        return (isValid.song&&isValid.image)?{opacity:1,pointerEvents:'auto'}:{opacity:0.6,pointerEvents:'none'}
    }
    const handleSongChange=(e)=>{
        setSong(e.target.files[0])
        tempAudioRef.current.src=URL.createObjectURL(e.target.files[0])
    }
    const handleImageChange=(e)=>{
        if(urlRef.current){
            URL.revokeObjectURL(urlRef.current)
        }
        urlRef.current=URL.createObjectURL(e.target.files[0])
        setImage(e.target.files[0])
    }
    const handleSingerName=(e)=>{
        setSingerName(e.target.value)
    }
    const handleSongName=(e)=>{
        setName(e.target.value)
    }
    const onSubmit=async(data)=>{
        if(!isValid.song||!isValid.image){
            return
        }
        let formData = new FormData();
        formData.append('song',song)
        formData.append('image',image)
        formData.append('singer',data.singer)
        formData.append('name',data.name)
        formData.append('duration',tempAudioRef.current.duration)
        setOpen(true)
        const res=await upload(formData)
        setOpen(false)
        console.log(res)
        if(res){
            setSong(null)
            setImage(null)
            setSingerName('')
            setName('')
            setIsValid({song:false,image:false})
            Toastify({
                text: "Đăng nhạc thành công",
                duration: 3000,
                className:'toast-upload',
                destination: "",
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                avatar:env.API_URL+res.song.avatar,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            dispath(appendSongInList(res.song))
        }
    }
    return (
        <div>
            <div className="container">
                <h3 className='text-center text-white' style={{marginBottom:40}}><AiOutlineCloudUpload style={{fontSize:'50px',marginRight:20}}/>Upload Nhạc của bạn</h3>
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className="upload-song">
                            <div className='file-area'>
                                <input 
                                    type="file" 
                                    name="song" 
                                    id="" 
                                    {...register("song")}
                                    onChange={handleSongChange}
                                />
                                <BsMusicNoteBeamed style={{fontSize:'80px'}}/>
                            </div>
                            {song?
                            <FileSongInfor name={song.name} size={song.size} type={song.type} setIsValid={setIsValid} isValid={isValid}/>:
                            <span className='text-white-sub' style={{flexBasis:'70%'}}>Chọn nhạc từ máy tính của bạn</span>}
                        </div>
                        <div className="upload-image">
                            <div className='file-area' style={{borderColor:'#f39c12'}}>
                                <input 
                                type="file" 
                                name="image" 
                                id="" 
                                {...register("image")}
                                onChange={handleImageChange}
                                />
                                <BsCardImage style={{fontSize:'80px',color:'#f39c12'}}/>
                            </div>
                            {image?
                            <FileImageInfor name={image.name} url={urlRef.current} type={image.type} setIsValid={setIsValid} isValid={isValid}/>:
                            <span className='text-white-sub' style={{flexBasis:'70%'}}>Chọn ảnh từ máy tính của bạn</span>}
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" className='text-white text-bold'>Tên bài hát</label>
                            <input {...register("name",{ required: true })} type='text' name='name' value={name} onChange={handleSongName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className='text-white text-bold'>Tên nghệ sĩ</label>
                            <input {...register("singer",{ required: true})} type='text' name='singer' value={singerName} onChange={handleSingerName}/>
                        </div>
                        <div className="form-group">
                            <div className='text-white text-bold'>Chọn dòng nhạc</div>
                            <div className="radio">
                                <label htmlFor="nation">Việt Nam</label>
                                <input type="radio" name="nation" id="" value='VN'/>
                            </div>
                            <div className="radio">
                                <label htmlFor="nation">US-UK</label>
                                <input type="radio" name="nation" id="" value='US-UK'/>
                            </div>
                            <div className="radio">
                                <label htmlFor="nation">Korea</label>
                                <input type="radio" name="nation" id="" value='KOREA'/>
                            </div>
                            <div className="radio">
                                <label htmlFor="nation">China</label>
                                <input type="radio" name="nation" id="" value='CHINA'/>
                            </div>
                        </div>
                        <button type='submit' className="btn-upload" style={styleButton()}>Đăng nhạc </button>
                    </div>
                    
                </form>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
            <CircularProgress color="secondary" />
            </Backdrop>
            <audio id='temp-audio'src='' ref={tempAudioRef}></audio>
        </div>
    );
}

export default UpLoad;