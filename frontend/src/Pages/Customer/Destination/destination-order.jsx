import React from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { setidAction } from "../../../Redux/idcapture/idcaptureAction";
import TextField from "@mui/material/TextField";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  createDestinationOrder,
  getDestinationById,
} from "../../../Api/services/destinationService";

function DestinationOrder() {
  const [progress, setProgress] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardType, setCardType] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [datebook, setDatebook] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedid = useSelector((state) => state.id.id);
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const userid = useSelector((state) => state.auth.loggedUser._id);
  const useremail = useSelector((state) => state.auth.loggedUser.email);

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
    queryFn: () => getDestinationById(storedid),
  });

  const handleHotelOrderSubmit = async () => {
    if (quantity === 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    if (datebook === null || datebook === "") {
      toast.error("Please book a date for the hotel room");
      return;
    }

    setSending(true);
    try {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

       await createDestinationOrder(
        userid,
        data?.useremail,
        data?._id,
        useremail,
        data?.title,
        quantity,
        data?.price * quantity,
        datebook,
        formattedDate
      ).then(() => {
        setSending(false);
        toast.success("Hotel Booked", {
          onClose: () => navigate("/home"),
        });
      });
    } catch (error) {
      console.log("Error in Adding Hotel Order", error);
      toast.error("Error in Adding Hotel Order");
      setSending(false);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= data?.NoTickets
    ) {
      // Update quantity state only if it's a valid number and within the range
      setQuantity(newQuantity);
    }
  };

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
        var fontSize = 20; // Initial font size
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

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    setCardNumber(value);

    // Regular expressions to identify card types
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const amexRegex = /^3[47][0-9]{13}$/;

    if (visaRegex.test(value)) {
      setCardType("visa");
    } else if (mastercardRegex.test(value)) {
      setCardType("mastercard");
    } else if (amexRegex.test(value)) {
      setCardType("americanexpress");
    } else {
      setCardType("");
    }
  };

  const renderCardIcon = () => {
    let iconSize = 24; // Adjust the size as needed
    if (cardType === "visa") {
      return <RiVisaFill sx={{ fontSize: iconSize }} />;
    } else if (cardType === "mastercard") {
      return <FaCcMastercard sx={{ fontSize: iconSize }} />;
    } else if (cardType === "americanexpress") {
      return <SiAmericanexpress sx={{ fontSize: iconSize }} />;
    }
    return null;
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
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <img
                src={data?.image}
                alt={data?.title}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "20px",
                  // margin: "20px",
                }}
              />
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  margin: "auto",
                  color: handleDarkmode(),
                }}
              >
                {data?.title}
              </Typography>
              <IconButton
                onClick={() => {
                  dispatch(setidAction(data?._id)).then(() => {
                    navigate("/viewone/hotel");
                  });
                }}
                style={{
                  color: handleDarkmode(),
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </div>
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{
                color: handleDarkmode(),
                width: "100%",
              }}
            >
              <DatePicker
                label="Booking Date"
                fullWidth
                value={datebook}
                onChange={(newValue) => {
                  setDatebook(newValue);
                }}
                variant="standard"
                sx={{ color: handleDarkmode(), margin: "20px", width: "98.5%" }}
                InputLabelProps={{
                  shrink: true,
                  sx: { color: handleDarkmode() },
                }}
                InputProps={{
                  sx: { color: handleDarkmode() },
                }}
                format="DD MMMM YYYY" // Set the format of the displayed date
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={
                      datebook ? dayjs(datebook).format("DD MMMM YYYY") : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              id="standard-number"
              label="Quantity"
              type="number"
              fullWidth
              value={quantity} // Use quantity state
              onChange={handleQuantityChange} // Handle quantity change
              InputLabelProps={{
                shrink: true,
                sx: { color: handleDarkmode() },
              }}
              InputProps={{
                sx: { color: handleDarkmode() },
              }}
              variant="standard"
              sx={{ color: handleDarkmode() }}
            />
            <Typography
              variant="h6"
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
                color: handleDarkmode(),
              }}
            >
              <span style={{ marginLeft: 0 }}>Price :</span>
              <span style={{ marginRight: 0 }}>
                {data?.price * quantity} LKR
              </span>
            </Typography>
            <TextField
              id="standard-basic"
              label="Card Holder Name"
              variant="standard"
              fullWidth
              sx={{ color: handleDarkmode(), marginTop: "20px" }}
              InputLabelProps={{
                sx: { color: handleDarkmode() },
              }}
              InputProps={{
                sx: { color: handleDarkmode() },
              }}
            />
            <TextField
              id="standard-basic"
              label="Card Number"
              variant="standard"
              fullWidth
              sx={{ color: handleDarkmode(), marginTop: "20px" }}
              InputLabelProps={{
                sx: { color: handleDarkmode() },
              }}
              InputProps={{
                sx: { color: handleDarkmode() },
                endAdornment: renderCardIcon(),
              }}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <TextField
              id="standard-basic"
              label="CVV"
              variant="standard"
              fullWidth
              sx={{ color: handleDarkmode(), marginTop: "20px" }}
              InputLabelProps={{
                sx: { color: handleDarkmode() },
              }}
              InputProps={{
                sx: { color: handleDarkmode() },
                inputProps: { maxLength: 3, pattern: "[0-9]*" }, // Restrict to 3 numbers
              }}
            />

            <TextField
              id="standard-basic"
              label="Expiry Date (Month/Year)"
              variant="standard"
              fullWidth
              sx={{ color: handleDarkmode(), marginTop: "20px" }}
              InputLabelProps={{
                sx: { color: handleDarkmode() },
              }}
              InputProps={{
                sx: { color: handleDarkmode() },
              }}
            />
            <div
              style={{
                margin: "20px",
              }}
            >
              <span
                style={{
                  color: handleDarkmode(),
                  margin: "auto",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Important: Pls note that this is a demo site and no real
                transaction and I am not responsible for any loss of money
              </span>
            </div>

            {sending ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20vh",
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
            ) : (
              <DynamicTextButton
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "white",
                  backgroundColor: "#f44336",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  borderRadius: "20px",
                  padding: "5px",
                  width: "20%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                disabled={sending}
                onClick={handleHotelOrderSubmit}
              >
                Pay
              </DynamicTextButton>
            )}
          </Box>
        </>
      )}
      <Footer />
    </div>
  );
}

export default DestinationOrder;
