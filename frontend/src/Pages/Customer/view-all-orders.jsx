import React from "react";
import Header from "../../Components/Header";
import StickyFooter from "../../Components/StickyFooter";
import Stack from "@mui/material/Stack";
import { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import ViewSouvenierOrder from "./Souvenier/view-souvenier-order";
import Viewhotelorder from "./Hotel/view-hotel-order";
import ViewDestinationOrder from "./Destination/view-destination-order";

function Viewallorder() {
  const [callsovenier, setCallSouvenier] = React.useState(false);
  const [callhotel, setCallHotel] = React.useState(false);
  const [calldestination, setCallDestination] = React.useState(false);

  const darkmode = useSelector((state) => state.darkmode.darkmode);

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

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: "40px",
          fontFamily: "sans-serif",
          color: handleDarkmode(),
        }}
      >
        My Orders
      </Typography>
      <Stack
        spacing={0}
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "40px",
          color: handleDarkmode(),
        }}
      >
        <DynamicTextButton
          variant="contained"
          sx={{
            backgroundColor: darkmode ? "#1c54b2" : "#2196f3",
            borderRadius: "20px 0 0 20px",
            fontFamily: "sans-serif",
            width: "160px",
            height: "50px",
            color: handleDarkmode(),
            "&:hover": {
              backgroundColor: "red",
            },
          }}
          onClick={() => {
            setCallSouvenier(true);
            setCallHotel(false);
            setCallDestination(false);
          }}
        >
          Souveniers
        </DynamicTextButton>
        <DynamicTextButton
          variant="contained"
          sx={{
            backgroundColor: darkmode ? "#1c54b2" : "#2196f3",
            width: "160px",
            height: "50px",
            fontFamily: "sans-serif",
            color: handleDarkmode(),
            "&:hover": {
              backgroundColor: "red",
            },
          }}
          onClick={() => {
            setCallSouvenier(false);
            setCallHotel(true);
            setCallDestination(false);
          }}
        >
          Hotel
        </DynamicTextButton>
        <DynamicTextButton
          variant="contained"
          sx={{
            backgroundColor: darkmode ? "#1c54b2" : "#2196f3",
            borderRadius: "0 20px 20px 0",
            fontFamily: "sans-serif",
            width: "160px",
            height: "50px",
            color: handleDarkmode(),
            "&:hover": {
              backgroundColor: "red",
            },
          }}
          onClick={() => {
            setCallSouvenier(false);
            setCallHotel(false);
            setCallDestination(true);
          }}
        >
          Destination
        </DynamicTextButton>
      </Stack>
      {!callsovenier && !callhotel && !calldestination && (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginTop: "40px",
            fontFamily: "sans-serif",
            color: handleDarkmode(),
          }}
        >
          Please select an order to view
        </Typography>
      )}
      {callsovenier && <ViewSouvenierOrder />}
      {callhotel && <Viewhotelorder />}
      {calldestination && <ViewDestinationOrder />}
      <StickyFooter />
    </div>
  );
}

export default Viewallorder;
