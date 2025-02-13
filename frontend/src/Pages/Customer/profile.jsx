import React from "react";
import Header from "../../Components/Header";
import StickyFooter from "../../Components/StickyFooter";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

function Profile() {
    const loggedUser = useSelector((state) => state.auth.loggedUser);
    return (
      <div
      style={{
        height: "100vh",
      }}
      >
        <Header />
        <Box
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "20px",
            margin: "60px auto",
            maxWidth: "350px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          }}
        >
          <Avatar
            alt={loggedUser?.username}
            src={loggedUser?.avatar}
            sx={{
              width: 200,
              height: 200,
              margin: "auto",
              marginBottom: "20px",
            }}
          />
          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "center", margin: "10px 0" }}
          >
            Username: {loggedUser?.username}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "center", margin: "10px 0" }}
          >
            Email: {loggedUser?.email}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "center", margin: "10px 0" }}
          >
            System Role: {loggedUser?.role}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "center", margin: "10px 0" }}
          >
            Secret Code: {loggedUser?.secretcode}
          </Typography>
        </Box>
        <StickyFooter />
      </div>
    );
  }
  

export default Profile;
