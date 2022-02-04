import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AiFillPlusCircle } from "react-icons/ai";
import {createPlayList} from '../api/user'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {useNavigate} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

function CreatePlayList({open,handleClose}) {
    const navigate=useNavigate()
    const [value,setValue]=useState('')
    const [isPublic,setIsPublic]=useState(true)
    const [isProgess,setIsProgess]=useState(false)
    const handleCreatePlayList=async()=>{
        setIsProgess(true)
        const data=await createPlayList({name:value,isPublic})
        setIsProgess(false)
        if(data.success){
            navigate(`/me/play-list/${data.newPlayList.slug}`)
        }
    }
    const handleInputChange=(e)=>{
        setValue(e.target.value)
    }
    const handleChecked=()=>{
        setIsPublic(!isPublic)
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className='word-space-normal' style={{display:'flex',alignItems:'center'}}>
            <AiFillPlusCircle className='icon-add'/>
            Tạo PlayList Mới</DialogTitle>
            <DialogContent>
                <DialogContentText className='word-space-normal'>
                    Nhập tên PlayList nào bạn ơi, đừng trùng tên với những PlayList trước đó của bạn nhé
                </DialogContentText>
            <TextField
                className='word-wrap-normal'
                autoFocus
                margin="dense"
                id="name"
                label="Tên PlayList"
                type="email"
                fullWidth
                variant="standard"
                value={value}
                onChange={handleInputChange}
            />
            <FormControlLabel
                className='word-wrap-normal'
                control={<Switch checked={isPublic} onChange={handleChecked} color="warning"/>}
                label={isPublic?'Công khai':'Cá nhân'}
            />
            </DialogContent>
            <DialogActions>
                <CircularProgress color="secondary" className={!isProgess?'ds-none':''} />
                <Button onClick={handleClose}>Đóng</Button>
                <Button onClick={handleCreatePlayList} className='word-space-normal'>Tạo PlayList</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreatePlayList;