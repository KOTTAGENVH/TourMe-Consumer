import React, { useEffect, useRef } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Iframe from "react-iframe";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  getSouvenierbyId,
  updateSouvenierRating,
} from "../../../Api/services/souvenierService";
import { useQuery } from "react-query";
import "../../../CSS/souvenierone.css";
import { useNavigate } from "react-router-dom";
import { setidAction } from "../../../Redux/idcapture/idcaptureAction";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function Viewonesouvenier() {
  const [progress, setProgress] = React.useState(0);
  const [openmodal, setOpenModal] = React.useState(false);
  const [hover, setHover] = React.useState(-1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedid = useSelector((state) => state.id.id);
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSouvenierbyId(storedid),
  });

  const handleDarkmode = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };

  const DynamicTextButton = ({ children, ...props }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
      const button = buttonRef.current;
      const adjustTextSize = () => {
        if (!button) return; // Check if button exists
        const maxWidth = button.offsetWidth;
        let fontSize = 20; // Initial font size
        const text = button.querySelector("span");
        if (!text) return; // Check if text element exists
        const originalText = text.innerText;
        text.style.fontSize = fontSize + "px";
        while (text.offsetWidth > maxWidth) {
          fontSize -= 1;
          text.style.fontSize = fontSize + "px";
          if (fontSize <= 8) break; // To avoid infinite loop
        }
        // Restoring original text if it was truncated
        if (text.offsetWidth < maxWidth) {
          text.innerText = originalText;
        }
      };
      adjustTextSize();
      window.addEventListener("resize", adjustTextSize);
      return () => {
        window.removeEventListener("resize", adjustTextSize);
      };
    }, []);

    return (
      <Button {...props} ref={buttonRef}>
        {children}
      </Button>
    );
  };

  const handleRatingupdate = async (rating) => {
    try {
      await updateSouvenierRating(storedid, rating).then((response) => {
        toast.success("Rating updated successfully");
        window.location.reload();
      });
    } catch (error) {
      toast.error("Rating update failed");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{
              color: handleDarkmode(),
            }}
          />
        </div>
      )}

      {data !== undefined && !isError && !isLoading && data?.length !== 0 && (
        <>
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              margin: "20px",
              color: handleDarkmode(),
            }}
          >
            {data?.title}
          </Typography>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 2000000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src={data?.image}
                className="swiper-slide-simg1"
                alt="Souvenier 1"
              />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-simg2">
              <img src={data?.image1} alt="Souvenier 2" />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide-simg3">
              {/* <video
      controls
      alt="video"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <source src={data?.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}
              <Iframe
                url={data?.video}
                width="100%"
                height="100%"
                id=""
                className=""
                display="block"
                position="relative"
              />
            </SwiperSlide>
          </Swiper>
          <Box
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "20px",
              margin: "60px",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 5px )",
              WebkitBackdropFilter: "blur( 5px )",
            }}
          >
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                margin: "20px",
                color: handleDarkmode(),
              }}
            >
              {data?.description}
            </Typography>
          </Box>
          <Box
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "20px",
              margin: "60px",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 5px )",
              WebkitBackdropFilter: "blur( 5px )",
            }}
          >
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                margin: "20px",
                color: handleDarkmode(),
              }}
            >
              Price(Rs): {data?.price}
            </Typography>
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                margin: "20px",
                color: handleDarkmode(),
              }}
            >
              Quantity Available: {data?.Quatity}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
                color: handleDarkmode(),
              }}
            >
              <Rating
                name="hover-feedback"
                value={data?.rating}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  handleRatingupdate(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "20px",
                  // color: handleDarkmode(),
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {data?.rating !== null && (
                <Box sx={{ ml: 2, color: handleDarkmode() }}>
                  {labels[hover !== -1 ? hover : data?.rating]}
                </Box>
              )}
            </div>
            <Stack
              spacing={0}
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "40px",
              }}
            >
              <DynamicTextButton
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                  borderRadius: "20px 0 0 20px",
                  fontFamily: "sans-serif",
                  width: "160px",
                  height: "50px",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
                onClick={() => {
                  navigate("/souveniers");
                }}
              >
                Back
              </DynamicTextButton>
              <DynamicTextButton
                variant="contained"
                sx={{
                  backgroundColor: "#ff9100",
                  width: "160px",
                  height: "50px",
                  fontFamily: "sans-serif",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
                onClick={() => {
                  dispatch(setidAction(data?._id)).then(() => {
                    navigate("/souvenierorder");
                  });
                }}
              >
                Buy
              </DynamicTextButton>
              <DynamicTextButton
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  borderRadius: "0 20px 20px 0",
                  fontFamily: "sans-serif",
                  width: "160px",
                  height: "50px",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
                onClick={handleOpen}
              >
                View in 3D
              </DynamicTextButton>
            </Stack>
          </Box>
          <Modal
            open={openmodal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "90%", // Adjust the width as a percentage of the viewport width
                height: "90%", // Adjust the height as a percentage of the viewport height
                borderRadius: "20px",
                position: "relative",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "black",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Iframe
                id="myId"
                src={data?.threedimage}
                width="100%"
                height="100%"
                styles={{ borderRadius: "20px" }}
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Modal>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Viewonesouvenier;
