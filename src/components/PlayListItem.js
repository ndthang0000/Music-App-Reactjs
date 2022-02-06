import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function MultiActionAreaCard({name,listSong,avatar,slug}) {
    return (
        <Link to={'/me/play-list/'+slug}>
            <Card sx={{ maxWidth: 345,marginTop:1 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="180"
                        image={avatar}
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className='name truncate'>
                            {name}
                            
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            - Có {listSong.length} bài hát
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <BsFillCollectionPlayFill />
                        <span style={{marginLeft:10}}> Play</span>
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}