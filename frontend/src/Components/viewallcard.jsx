import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setidAction } from "../Redux/idcapture/idcaptureAction";

function Viewallcard({ id, title, description, image, price }) {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract the endpoint from the URL
  const getEndpointFromUrl = () => {
    const parts = location.pathname.split("/");
    return parts[parts.length - 1];
  };

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
        margin: 2,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        webkitBackdropFilter: "blur(10px)",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        width="100"
        image={image}
        alt="images"
        sx={{ height: 200 }}
      />
      <CardContent
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rs.{price}
        </Typography>
      </CardContent>
      <CardActionArea>
        <Button
          sx={{
            width: "100%",
            backgroundColor: darkmode ? "#1c54b2" : "#2196f3",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            color: handleDarkmode(),
          }}
          onClick={() => {
            dispatch(setidAction(id));
            const endpoint = getEndpointFromUrl();
            if (endpoint === "destinations") {
              navigate(`/viewone/destination`);
            } else if (endpoint === "souveniers") {
              navigate(`/viewone/souvenier`);
            } else if (endpoint === "hotels") {
              navigate(`/viewone/hotel`);
            }
          }}
        >
          View
        </Button>
      </CardActionArea>
    </Card>
  );
}

export default Viewallcard;
