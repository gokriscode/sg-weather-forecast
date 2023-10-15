import { List, ListItem, ListItemText } from "@mui/material"
import { useState } from "react";


export const LocationComponent = (props) => {

    const { locations, handleListChange } = props;
    const [index, setIndex] = useState(0)

    const handleChange = (location, i) => {
      console.log("Location Selected ", location)
        handleListChange(location, i);
        setIndex(i)
    }
    
    return (
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
                    <ListItem key={i} sx={{ cursor: 'pointer', bgcolor: index === i ? 'gray' : null }} onClick={() => handleChange(location, i)}>
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
    )
}