import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import {getAllPlayList} from '../api/user'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {userInfor} from '../redux/selector/userInfor'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import env from "react-dotenv";
import Toastify from 'toastify-js'
import {addPlayList} from '../api/user'
import "toastify-js/src/toastify.css"

function SimpleDialog(props) {

    const userInfo=useSelector(userInfor)
    const navigate=useNavigate()
    const [playList,setPlayList]=useState([])
    useEffect(async()=>{
        if(!userInfo){
            return navigate('/not-login')
        }
        const data=await getAllPlayList({uid:userInfo.uid})
        if(data.success){
            setPlayList(data.allPlayList)
        }
    },[userInfo])

    const { onClose, open } = props;
    const [checked,setChecked]=useState({})

    const handleClose = () => {
        onClose();
    };
    const handleCheckBoxChange=(e)=>{
        setChecked({
            ...checked,
            [e.target.name]: e.target.checked,
        });
    }
    const checkCheckedBox=()=>{
        for (let key in checked) {
            if (checked.hasOwnProperty(key)) {
                if(checked[key]){
                    return true
                }
            }
        }
        return false
    }
    const handleAddPlayList=async()=>{
        const data=await addPlayList({songId:props.idSong,checked})
        if(data.success){
            Toastify({
                text: "Đã thêm "+props.name?.toUpperCase()+" vào PlayList thành công",
                duration: 3000,
                destination: "",
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                avatar:env.API_URL+props.avatar,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            onClose();
        }
    }
    return (
        <Dialog onClose={handleClose} open={open} className='dialog'>
            <DialogTitle>Chọn PlayList</DialogTitle>
            <List sx={{ pt: 0 }}>
                {playList?.map((item) => (
                <ListItem key={item._id}>
                    <Checkbox color="secondary" onChange={handleCheckBoxChange} name={item._id}/>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600]}}  src={item.avatar}>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                </ListItem>
                ))}
                <div style={{textAlign:'right',marginRight:15}}>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        disabled={!checkCheckedBox()}
                        onClick={handleAddPlayList}
                    >
                        Thêm
                    </Button>
                </div>
                
            </List>
        </Dialog>
    );
}

export default SimpleDialog