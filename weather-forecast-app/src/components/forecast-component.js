import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useState } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import { pink, yellow } from '@mui/material/colors';


export const ForecastComponent = (props) => {

    const { location } = props;

    let weatherIcon = 'wi wi-night-clear';
    if (location !== null && location.forecast) {
        switch (location.forecast) {
            case "Fair (Night)":
                weatherIcon = 'wi wi-night-clear';
                break;
            case "Fair (Day)":
                weatherIcon = 'wi wi-day-sunny';
                break;
            case "Windy":
                weatherIcon = 'wi wi-cloudy-windy';
                break;
            case "Partly Cloudy (Day)":
                weatherIcon = 'wi wi-day-cloudy';
                break;
            case "Fair & Warm":
                weatherIcon = 'wi wi-day-sunny-overcast';
                break;
            default:
                weatherIcon = 'wi wi-day-sunny';
        }
    }

    return (
        <>
        <Box display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ border: 1, height: 200}}>
        <div className="weather-icon">
            <i className={weatherIcon}></i>
        </div>
        </Box>
        <Box display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ border: 1, height: 60}}>
        <Typography color="black">
            {location?.forecast} | {location?.name}
        </Typography>
        </Box>
        </>
    )
}