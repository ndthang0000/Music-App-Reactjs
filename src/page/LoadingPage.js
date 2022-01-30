import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import theme from '../theme';

export default function LoadingPage({open}) {
    const themeLocaltorage=parseInt(localStorage.getItem('activeTheme'))||0

    React.useEffect(()=>{
        document.querySelector('body').style.backgroundImage=`url(${theme[themeLocaltorage].url})`
    },[])

    return (
        <>
            <Backdrop
            sx={{ color: '#fff' }}
            open={open}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}