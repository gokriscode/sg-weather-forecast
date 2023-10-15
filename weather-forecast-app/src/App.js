import logo from './logo.svg';
import './App.css';
import { Box, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, TimePicker, renderTimeViewClock, DateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from './store';
import { thunks } from './thunks/locations';
import LightModeIcon from '@mui/icons-material/LightMode';
import { pink, yellow } from '@mui/material/colors';

function App() {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const locationResponse = useSelector(state => state.locations.locations);
  const [locations, setLocations] = useState(null);
  const [location, setLocation] = useState(null);
  const [index, setIndex] = useState(0);

  const handleDateChange = (date) => {
    setDate(date)
  }

  const handleLocation = async (date) => {
    const request = {
      dateTime: date
    }
    await dispatch(thunks.getLocations(request));
  }

  useEffect(() => {
    const dateFormat = moment(date).format("YYYY-MM-DDThh:mm:ss");
    handleLocation(dateFormat)
  }, [date])

  useEffect(() => {
    setLocations(locationResponse);
    setLocation(locationResponse[0]);
  }, [locationResponse])

  const handleListChange = (location, i) => {
    setLocation(location);
    setIndex(i)
  }

  return (
    <div className="App">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid item md={12}>
            <DateTimePicker onChange={handleDateChange} value={date}></DateTimePicker>
          </Grid>

          <Grid container spacing={4}>
            <Grid mt={5} item md={6} xs={12}>
              {/* <Box sx={}> */}
              <List sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 250
              }}>
                {
                  locations && locations.length > 0 ?
                    locations.map((location, i) => {
                      return (
                        <ListItem key={i} sx={{ cursor: 'pointer', bgcolor: index === i ? 'gray' : null }} onClick={() => handleListChange(location, i)}>
                          <ListItemText>{location.name}</ListItemText>
                        </ListItem>
                      )
                    })
                    : (
                      <ListItem>
                        <ListItemText>No Locations</ListItemText>
                      </ListItem>
                    )
                }
              </List>
              {/* </Box> */}
            </Grid>
            <Grid mt={5} item md={6} xs={12}>
              <Box display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ border: 1, height: 200, bgcolor: 'black' }}>
                <LightModeIcon sx={{ color: yellow[500], fontSize: 58 }} />
              </Box>
              <Box display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ border: 1, height: 60, bgcolor: 'yellow' }}>
                <Typography color="black">
                  {location?.forecast}
                </Typography>
              </Box>

            </Grid>
            <Grid item md={2} mt={2}></Grid>
            <Grid item md={8} xs={12} mt={2}>
              {
                location?.imagedata.length > 0 ?
                  <img style={{ width: '100%' }} src={location?.imagedata[0].image} />
                  : null
              }

            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
