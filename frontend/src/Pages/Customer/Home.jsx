import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import DestinationCarouselImage from "../../Resources/DestinationCarousel.jpeg";
import SouvenierImage from "../../Resources/SouvenierCarousel.jpeg";
import HotelImage from "../../Resources/HotelCarousel.webp";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../CSS/CustomerHome.css";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Footer from "../../Components/Footer";

function Home() {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const [isHovered, setHovered] = useState(false);
  const [isHovered1, setHovered1] = useState(false);
  const [isHovered2, setHovered2] = useState(false);
const [isboxwidth, setBoxWidth] = useState("390px");

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
  useEffect(() => {
    // Run once when component mounts
    if (window.innerWidth <= 1024 && window.innerHeight <= 1366) {
      setBoxWidth("290px");
    } else {
      setBoxWidth("390px");
    }
  }, []);

  return (
    <div >
      <Header />
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 20000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide1"></SwiperSlide>
        <SwiperSlide className="swiper-slide2"></SwiperSlide>
        <SwiperSlide className="swiper-slide3"></SwiperSlide>
        <SwiperSlide className="swiper-slide4"></SwiperSlide>
        <SwiperSlide className="swiper-slide5"></SwiperSlide>
        <SwiperSlide className="swiper-slide6"></SwiperSlide>
        <SwiperSlide className="swiper-slide7"></SwiperSlide>
      </Swiper>
      <Box
        sx={{
          position: "relative",
          backdropFilter: "blur(10px)",
          padding: "20px",
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          borderRadius: "20px",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ color: handleDarkmode() }}
        >
          {" "}
          Our Story{" "}
        </Typography>

        <Typography
          variant="body1"
          component="div"
          gutterBottom
          sx={{ color: handleDarkmode() }}
        >
          {" "}
          This is a small project done by me(Nowen Kottage) using the MERN stack, Redux, Rapid
          Api. The main motive of this project is to give the user a platform
          where they can find details of Sri - Lanka and also book hotels,
          destinations and purchase souvenirs. Pls note that this is a DEMO. Note: Images and text were taken 
          from the internet.{" "}
        </Typography>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: flexingdirec,
        }}
      >
        <Box
          sx={{
            backgroundPosition: "center",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: isboxwidth,
            height: "300px",
            margin: "auto",
            marginTop: "20px",
            color: handleDarkmode(),
            marginBottom: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {isHovered ? (
            <Button
              variant="contained"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                color: handleDarkmode(),
                fontSize: "24px",
                borderRadius: "20px",
              }}
              onClick={() => navigate("/destinations")}
            >
              View Destinations
            </Button>
          ) : (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <img
                src={DestinationCarouselImage}
                alt="Destination"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Destination
              </p>
            </div>
          )}
        </Box>
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: isboxwidth,
            height: "300px",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            borderRadius: "20px",
          }}
          onMouseEnter={() => setHovered1(true)}
          onMouseLeave={() => setHovered1(false)}
        >
          {isHovered1 ? (
            <Button
              variant="contained"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                color: handleDarkmode(),
                fontSize: "24px",
                borderRadius: "20px",
              }}
              onClick={() => navigate("/souveniers")}
            >
              View Souveniers
            </Button>
          ) : (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <img
                src={SouvenierImage}
                alt="Souvenier"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Souvenier
              </p>
            </div>
          )}
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(10px)",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: isboxwidth,
            height: "300px",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            borderRadius: "20px",
          }}
          onMouseEnter={() => setHovered2(true)}
          onMouseLeave={() => setHovered2(false)}
        >
          {isHovered2 ? (
            <Button
              variant="contained"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                color: handleDarkmode(),
                fontSize: "24px",
                borderRadius: "20px",
              }}
              onClick={() => navigate("/hotels")}
            >
              View Hotels
            </Button>
          ) : (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <img
                src={HotelImage}
                alt="Hotel"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Hotel
              </p>
            </div>
          )}
        </Box>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
