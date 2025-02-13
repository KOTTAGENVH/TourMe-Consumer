import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Airportimage from "../Resources/airportimage.jpeg";

function AirportCard({
  code,
  country_code,
  name,
  city_name,
  display_name,
  display_title,
  display_subtitle,
  location_id,
  timezone,
  latitude,
  longitude,
}) {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const handleDarkmode = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };

  return (
    <Card
    sx={{
      maxWidth: 345,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      backdropFilter: 'blur(10px)', 
      borderRadius: '10px', 
      webkitBackdropFilter: 'blur( 10.0px )',
      margin: "20px",
    }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image= {Airportimage}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: handleDarkmode(),
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: handleDarkmode(),
          }}
        >
          {display_name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: handleDarkmode(),
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          {timezone}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AirportCard;
