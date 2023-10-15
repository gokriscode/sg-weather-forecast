import logo from './logo.svg';
import './App.css';
import { Box, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { DatePicker, TimePicker, renderTimeViewClock, DateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from './store';
import { thunks } from './thunks/locations';
import { LocationComponent } from './components/location-component';
import { ForecastComponent } from './components/forecast-component';
import { TrafficImageComponent } from './components/trafficimage-component';

function App() {
  const [date, setDate] = useState(new Date(moment().startOf('day')));
  const dispatch = useDispatch();
  const locationsResponse = useSelector(state => state.locations.locations);
  const locationDetailResponse = useSelector(state => state.locations.location);
  const [locations, setLocations] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationDetail, setLocationDetail] = useState(null)
  const [index, setIndex] = useState(0);

  const handleDateChange = (date) => {
    console.log("Date change")
    setDate(date)
  }

  const handleLocation = async (date) => {
    const request = {
      dateTime: date
    }
    await dispatch(thunks.getLocations(request));
  }

  useEffect(() => {
    const dateFormat = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    handleLocation(dateFormat)
  }, [date])

  useEffect(() => {
    if(locationsResponse?.locations?.length > 0) {
      setLocations(locationsResponse?.locations);
      setLocation(locationsResponse?.locations[0]);
      handleListChange(locationsResponse?.locations[0], 0)
    }
  }, [locationsResponse])

  useEffect(() => {
    if(locationDetailResponse) {
      setLocationDetail(locationDetailResponse)
    }

  }, [locationDetailResponse])

  const handleListChange = async (locationDetail, i) => {
    console.log("List change",locationDetail, i)
    setLocation(locationDetail);
    setIndex(i);
    if(locationDetail) {
      const request = {
        dateTime: moment(date).format("YYYY-MM-DDTHH:mm:ss"),
        locationName: locationDetail?.name
      }
      await dispatch(thunks.getTrafficImages(request))

    }
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
            <DateTimePicker format='dd-MM-yyyy HH:mm:ss' onChange={handleDateChange} value={date}></DateTimePicker>
          </Grid>

          <Grid container spacing={4}>
            <Grid mt={5} item md={6} xs={12}>
              <LocationComponent locations={locations} handleListChange={handleListChange}></LocationComponent>
            </Grid>
            <Grid mt={5} item md={6} xs={12}>
              <ForecastComponent location={location} />
            </Grid>
            <Grid item md={2} mt={2}></Grid>
            <Grid item md={8} xs={12} mt={2}>
              <TrafficImageComponent locationDetail={locationDetail} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
