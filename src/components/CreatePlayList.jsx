import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AiFillPlusCircle } from "react-icons/ai";
import {createPlayList,editPlayList} from '../api/user'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import {setUser, setPlaylistAction} from '../redux/action/user'
import {getAllPlayList} from '../api/user'

function CreatePlayList({open,handleClose,defaultValue,defaultIsPublic,edit,_id,handleEditName}) {
    const dispath=useDispatch()
    const navigate=useNavigate()
    const [value,setValue]=useState('')
    const [isPublic,setIsPublic]=useState(true)
    const [isProgess,setIsProgess]=useState(false)
    const handleCreatePlayList=async()=>{
        setIsProgess(true)
        let data;
        if(edit){
            data=await editPlayList({name:value,isPublic,_id})
            
        }else{
            data=await createPlayList({name:value,isPublic})
        }
        setIsProgess(false)
        if(data.success){
            const res=await getAllPlayList()
            if(res.success){
                dispath(setPlaylistAction(res.allPlayList))
            }
            handleClose()
            navigate('/me/play-list/'+data.newPlayList.slug)
            if(edit){
                handleEditName(data.newPlayList.slug)
            }
        }
    }
    const handleInputChange=(e)=>{
        setValue(e.target.value)
    }
    const handleChecked=()=>{
        setIsPublic(!isPublic)
    }
    useEffect(()=>{
        setValue(defaultValue)
        setIsPublic(defaultIsPublic)
    },[defaultValue,defaultIsPublic])
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className='word-space-normal' style={{display:'flex',alignItems:'center'}}>
            <AiFillPlusCircle className='icon-add'/>
            T???o PlayList M???i</DialogTitle>
            <DialogContent>
                <DialogContentText className='word-space-normal'>
                    Nh???p t??n PlayList n??o b???n ??i, ?????ng tr??ng t??n v???i nh???ng PlayList tr?????c ???? c???a b???n nh??
                </DialogContentText>
            <TextField
                className='word-wrap-normal'
                autoFocus
                margin="dense"
                id="name"
                label="T??n PlayList"
                type="email"
                fullWidth
                variant="standard"
                value={value}
                onChange={handleInputChange}
            />
            <FormControlLabel
                className='word-wrap-normal'
                control={<Switch checked={isPublic} onChange={handleChecked} color="warning"/>}
                label={isPublic?'C??ng khai':'C?? nh??n'}
            />
            </DialogContent>
            <DialogActions>
                <CircularProgress color="secondary" className={!isProgess?'ds-none':''} />
                <Button onClick={handleClose}>????ng</Button>
                <Button onClick={handleCreatePlayList} className='word-space-normal'>{edit?'Chinh Sua':'T???o PlayList'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePlayList;