import React from "react";
import Box from "@mui/system/Box";

function StickyFooter() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "40px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backdropFilter: "blur(10px)",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
        <span>&copy; 2024 Nowen Kottage. Coding rights reserved. Contact: nowenportfolio@gmail.com</span>
    </Box>
  );
}

export default StickyFooter;
