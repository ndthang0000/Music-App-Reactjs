import * as React from 'react';
import Typography from '@mui/material/Typography';




export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
        <Typography variant="subtitle1" component="div">
            Selected: 
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
            Open simple dialog
        </Button>
        <SimpleDialog
            open={open}
        />
        </div>
    );
}