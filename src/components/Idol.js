import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from 'moment'
import Follow from '../components/Follow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import {unFollow} from '../api/user'
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
            },
            '&:active': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity,
            ),
            },
        },
        },
    }));
function Idol(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checkFollow,setCheckFollow]=useState(false)

    const open = Boolean(anchorEl);
    const handleOpenUnfollow = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseUnfollow = () => {
        setAnchorEl(null);
    };
    const handleUnfollow=async(id)=>{
        const res=await unFollow(id)
        if(res.success){
            setCheckFollow(false)
        }
    }
    return (
        <div className="col-lg-3 col-md-4 col-sm-6" key={props._id}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                    <Link to={props.email}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={props.photoURL}>
                        
                        </Avatar>
                    </Link>
                    }
                    action={
                    <IconButton aria-label="settings" onClick={handleOpenUnfollow}>
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={props.name}
                    subheader={moment(props?.createdAt).format('LL')}
                    className='word-space-normal'
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" className='word-space-normal'>
                    <span style={{fontWeight:550}} className='word-space-normal'>Tiểu sử : </span> {props.story}
                    </Typography>
                </CardContent>
                <Follow id={props._id} checkFollow={checkFollow} setCheckFollow={setCheckFollow}/>
            </Card>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseUnfollow}
            >
                <MenuItem onClick={()=>{handleCloseUnfollow();handleUnfollow(props._id)}} disableRipple>
                    <EditIcon />
                    Bỏ theo dõi
                </MenuItem>
                <Link to={props.email}>
                    <MenuItem onClick={handleCloseUnfollow} disableRipple>
                        <FileCopyIcon />
                        Xem chi tiết
                    </MenuItem>
                </Link>
                <Divider sx={{ my: 0.5 }} />
            </StyledMenu>
        </div>
    );
}

export default Idol;