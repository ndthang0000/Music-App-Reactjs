import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../components/Wrapper';
import {useSelector,useDispatch} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {useNavigate} from 'react-router-dom'
import {setUser} from '../redux/action/user'
import { getAuth, signOut } from "firebase/auth";
import {getAllPlayList} from '../api/user'
import {BiSlideshow } from "react-icons/bi";
import PlayListItem from '../components/PlayListItem'
import { AiFillPlusCircle } from "react-icons/ai";
import CreatePlayList from '../components/CreatePlayList';
import {setPlaylistAction} from '../redux/action/user'
import {getOneIdol} from '../api/idol'
import { BsBrush, BsMusicNoteBeamed, BsFillFileEarmarkExcelFill, BsController } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import {editStory} from '../api/user'
import Toastify from 'toastify-js'
import { getMySong } from '../api/user'
import SongItem from '../components/SongItem'
import { appendSongInList, setList } from '../redux/action/playMusic'

function Me(props) {
    const playList=useSelector(state=>state.user.playList)
    const [open, setOpen] = useState(false);
    const [story,setStory]=useState('')
    const storyRef=useRef(null)
    const [isEditStory,setIsEditStory]=useState(false)
    const [mySong,setMySong]=useState([])
    const auth=getAuth()
    const userInfo=useSelector(userInfor)
    const dispatch=useDispatch()
    const navigate=useNavigate()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const newLine = (a) => {
        if (a) return a.replace(/\n/g, '<br />')
    }

    const handleClose = () => {
        setOpen(false);
    };

    
    const handleLogout=()=>{
        signOut(auth).then(() => {
            navigate('/')
            dispatch(setUser({user:null,playList:[]}))
        }).catch((error) => {
            console.log(error)
        });
    }
    const handleEditStory=(e)=>{
        setIsEditStory(true)
        storyRef.current.contentEditable=true
        storyRef.current.focus()
        storyRef.current.innerText=''
        storyRef.current.innerText=story
    }
    const handleSaveStory=async(e)=>{
        setIsEditStory(false)
        storyRef.current.contentEditable=false
        const res=await editStory({newStory:storyRef.current.innerText})
        setStory(res.newStory)
        if(res.success){
            Toastify({
                text: "Thay đổi Story thành công",
                className: "info",
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        }
    }
    const handlePlayPlayList=()=>{
        let playMusic=JSON.parse(localStorage.getItem('playMusic'))
        let randomNumber=Math.floor(Math.random() * mySong.length);
        playMusic.currentSong=randomNumber
        localStorage.setItem('playMusic',JSON.stringify(playMusic))
        dispatch(setList({
            playList:mySong,
            index:randomNumber
        }))
    }
    useEffect(async()=>{
        const res=await getMySong()
        console.log(res)
        if(res.success){
            setMySong(res.mySong)
        }
    },[])
    useEffect(async()=>{
        if(!userInfo){
            return navigate('/not-login')
        }
        if(playList.length===0){
            const data=await getAllPlayList()
            if(data.success){
                dispatch(setPlaylistAction(data.allPlayList))
            }
        }
    },[userInfo])
    useEffect(async()=>{
        const res=await getOneIdol(userInfo.email)
        setStory(res.idol.story)
        storyRef.current.innerHTML=newLine(res.idol.story)
    },[])
    const handleAppendPlaySong=(index)=>{
        dispatch(appendSongInList(mySong[index]))
    }
    return (
        <Wrapper>
                <div className='me-content'>
                    <div className="text-center">
                        <img src={userInfo?.photoURL} alt="" className='avatar-area'/>
                        <h2 className='name'>{userInfo?.displayName}</h2>
                        <div className='story'>
                            <div style={{fontWeight:600}}>
                                {isEditStory?
                                <BiSave 
                                    style={{cursor:'pointer',marginRight:10,color:'#e67e22',fontSize:20}}
                                    onClick={handleSaveStory}
                                />:
                                <BsBrush 
                                    style={{cursor:'pointer',marginRight:10,color:'#e67e22',fontSize:20}}
                                    onClick={handleEditStory}
                                />
                                }
                                Tiểu sử :
                            </div>
                            <span ref={storyRef} style={{paddingInline:10,fontStyle:'italic'}}></span>
                        </div>
                        <div className='me-content-control'>
                            <div className='btn-upgrade vip'>Nâng cấp VIP</div>
                            <div className='btn-upgrade logout' onClick={handleLogout}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
                <div className="play-list">
                    <h1 className='play-list-tittle'>
                        <div className='side-bar-menu-playlist' style={{marginRight:10}}>
                            <BiSlideshow className='fs-20'/>
                        </div>
                        <span>PlayList Của Bạn</span>
                    </h1>
                    <div className="play-list-content">
                        <div className="row" style={{gap:20}}>
                            <div className="col-lg-3 col-md-4 col-sm-6 word-space-normal create-play-list"  onClick={handleClickOpen}>
                                <div className='add-area'>
                                    <AiFillPlusCircle className='icon-add'/>
                                    Tạo PlayList Mới
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{gap:0}}>
                            {playList?.map(item=>(
                                <div className="col-lg-2 col-md-3 col-sm-6 word-space-normal" key={item._id}>
                                    <PlayListItem {...item}/>
                                </div>))
                            }
                        </div>
                    </div>
                </div>
                <CreatePlayList open={open} handleClose={handleClose} userInfo={userInfo}/>
                <div className='my-music'>
                    <h1 className='play-list-tittle'>
                        <div className='side-bar-menu-playlist icon' style={{marginRight:10}}>
                            <BsMusicNoteBeamed className='fs-20'/>
                        </div>
                        <span>Nhạc của bạn</span>
                    </h1>
                    <div className='btn-play-all' onClick={handlePlayPlayList}>
                        <BsController className='icon-play'/>
                        Phát Ngẩu Nhiên tất cả
                    </div>
                    <div className='list-song'>
                        {mySong.length>0?
                            mySong.map((item,index)=><SongItem data={item} {...item} index={index} key={index} active={-1} handleAppendPlaySong={handleAppendPlaySong}/>):
                            (<div className='empty-song'>
                                <BsFillFileEarmarkExcelFill className='icon'/>
                                Chưa có bài hát nào
                            </div>)
                        }
                    </div>
                </div>
        </Wrapper>
    );
}

export default Me;