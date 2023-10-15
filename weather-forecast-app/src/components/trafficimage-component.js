import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import { pink, yellow } from '@mui/material/colors';


export const TrafficImageComponent = (props) => {

    const { locationDetail } = props;
    
    return (
        <>
        {
        locationDetail?.imagedata.length > 0 ?
            <img style={{ width: '100%' }} src={locationDetail?.imagedata[0].image} />
            : <img src="/assets/traffic-image-not-found.png" className="img-responsive mb-4" alt="Not Found" />
        }
        </>
    )
}