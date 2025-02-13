import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useQuery } from "react-query";
import { allSriLankanAirports } from "../../Api/services/airportService";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import AirportCard from "../../Components/AirportCard";
import CircularProgress from "@mui/material/CircularProgress";
import StickyFooter from "../../Components/StickyFooter";

function Airports() {
  const [progress, setProgress] = React.useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const darkmode = useSelector((state) => state.darkmode.darkmode);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => allSriLankanAirports(),
  });

  const handleDarkmode = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };

  let flexingdirec;

  if (window.innerWidth <= 1024 && window.innerHeight <= 1366) {
    flexingdirec = "column";
  } else {
    flexingdirec = "row";
  }

  const filteredAirports = data && Array.isArray(data) ? data.filter(
    (airport) =>
      (airport.name &&
        airport.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (airport.city_name &&
        airport.city_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (airport.display_name &&
        airport.display_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (airport.display_title &&
        airport.display_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (airport.display_subtitle &&
        airport.display_subtitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "120vh" }}
    >
      <Header />
      <TextField
        id="search-airports"
        label="Search Airports"
        variant="standard"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          color: handleDarkmode(),
          width: "70%",
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifySelf: "center",
          alignContent: "center",
          alignSelf: "center",
          justifyContent: "center",
          padding: "5px",
          justifyItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "& .MuiInputAdornment-positionEnd": {
            marginLeft: "0px",
            marginRight: "0px",
            color: "white",
            "&:hover": {
              cursor: "pointer",
              color: "white",
              transition: "all 0.3s ease",
              transform: "scale(1.1)",
              "&:active": {
                transform: "scale(1.2)",
                transition: "all 0.1s ease",
              },
            },
          },
        }}
        InputProps={{
          border: "none",
          disableUnderline: true,
          endAdornment: (
            <SearchIcon
              sx={{
                color: handleDarkmode(),
                justifyContent: "center",
                display: "flex",
                "&:hover": {
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: "scale(1.1)",
                  "&:active": {
                    transform: "scale(1.2)",
                    transition: "all 0.1s ease",
                  },
                },
              }}
            />
          ),
          inputProps: {
            style: {
              fontSize: "2vh",
              color: handleDarkmode(),
            },
          },
        }}
      />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress variant="determinate" value={progress} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: flexingdirec,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredAirports?.length > 0 && !isError ? (
          filteredAirports.map((airport) => (
            <AirportCard
              key={airport.code}
              code={airport.code}
              country_code={airport.country_code}
              name={airport.name}
              city_name={airport.city_name}
              display_name={airport.display_name}
              display_title={airport.display_title}
              display_subtitle={airport.display_subtitle}
              location_id={airport.location_id}
              timezone={airport.time_zone_name}
              latitude={airport.latitude}
              longitude={airport.longitude}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              color: handleDarkmode(),
            }}
          >
            <h1>No Airports found</h1>
          </div>
        )}
      </div>
      {data === undefined &&
        !isLoading &&
        isError(
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h1>Something went wrong</h1>
          </div>
        )}

      <StickyFooter/>
    </div>
  );
}

export default Airports;
