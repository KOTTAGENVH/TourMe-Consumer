import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { getAlldestinations } from "../../../Api/services/destinationService";
import Viewallcard from "../../../Components/viewallcard";
import StickyFooter from "../../../Components/StickyFooter";

function Destinations() {
  const [progress, setProgress] = React.useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const darkmode = useSelector((state) => state.darkmode.darkmode);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Adjust items per page for mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    setItemsPerPage(isMobile ? 2 : 10);
  }, []);

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAlldestinations(),
  });

  const navigate = useNavigate();
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

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };


  const filteredDestinations = Array.isArray(data) ? data?.filter(destination =>
    destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.maindescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.Address1.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div
      style={{
        height: "120vh",
      }}
    >
      <Header />
      <TextField
        id="search-destinations"
        label="Search Destinations"
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
      {filteredDestinations!==undefined && !isLoading && !isError && data?.length!==0 && filteredDestinations
          ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          ?.map((destination) => (
            <Viewallcard
              key={destination._id}
              id={destination._id}
              title={destination.title}
              description={destination.maindescription}
              image={destination.image}
              price={destination.price}
            />
          ))}
      </div>
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handleChangePage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {data?.length === 0 && !isLoading && !isError && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>No Destinations Found</h1>
        </div>
      )}

      {data === undefined && !isLoading && isError && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>Error Fetching Destinations</h1>
        </div>
      )}
      <StickyFooter />
    </div>
  );
}

export default Destinations;
