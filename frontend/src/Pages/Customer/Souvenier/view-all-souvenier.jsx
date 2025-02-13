import React, { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllsouveniers } from "../../../Api/services/souvenierService";
import Viewallcard from "../../../Components/viewallcard";
import StickyFooter from "../../../Components/StickyFooter";

function Souvenier() {
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

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllsouveniers(),
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

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  let filteredSouveniers = [];

  if (!isLoading && !isError && data !== undefined) {
    filteredSouveniers = Array.isArray(data) ? data.filter(souvenir =>
      souvenir.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      souvenir.maindescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      souvenir.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      souvenir.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      souvenir.Address1.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
  }

  return (
    <div
      style={{
        height: "120vh",
      }}
    >
      <Header />
      <TextField
        id="search-souveniers"
        label="Search Souveniers"
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
        {filteredSouveniers !== undefined &&
          !isLoading &&
          !isError &&
          data?.length !== 0 &&
          filteredSouveniers
            ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            ?.map((souvenier) => (
              <Viewallcard
                key={souvenier._id}
                id={souvenier._id}
                title={souvenier.title}
                description={souvenier.maindescription}
                image={souvenier.image}
                price={souvenier.price}
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
          <h1>No Souveniers Found</h1>
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
          <h1>Error Fetching Souvenier</h1>
        </div>
      )}
      <StickyFooter />
    </div>
  );
}

export default Souvenier;
