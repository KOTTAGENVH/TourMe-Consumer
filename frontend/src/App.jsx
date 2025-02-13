import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/Authentication/SignIn";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./Pages/Authentication/ForgetPassword";
import SignUp from "./Pages/Authentication/SignUp";
import Home from "./Pages/Customer/Home";
import { useSelector } from "react-redux";
import AboutSriLanka from "./Pages/Customer/AboutSriLanka";
import Destinations from "./Pages/Customer/Destination/view-all-destinations";
import Airports from "./Pages/Customer/Airports";
import Souvenier from "./Pages/Customer/Souvenier/view-all-souvenier";
import Hotels from "./Pages/Customer/Hotel/view-all-hotels";
import Viewonedestination from "./Pages/Customer/Destination/view-one-destination";
import Viewonehotel from "./Pages/Customer/Hotel/view-one-hotel";
import Viewonesouvenier from "./Pages/Customer/Souvenier/view-one-souvenier";
import Souvenierorder from "./Pages/Customer/Souvenier/souvenier-order";
import Hotelorder from "./Pages/Customer/Hotel/hotel-order";
import DestinationOrder from "./Pages/Customer/Destination/destination-order";
import Profile from "./Pages/Customer/profile";
import Viewallorder from "./Pages/Customer/view-all-orders";
function App() {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const darkmode = useSelector((state) => state.darkmode.darkmode);

  const handleCss = () => {
    if (darkmode) {
      return "AppDarkmode";
    } else {
      return "App";
    }
  };
  return (
    <div className={handleCss()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          {loggedUser.role === "customer" && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/about-Sri-Lanka" element={<AboutSriLanka />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/souveniers" element={<Souvenier />} />
              <Route path="/airports" element={<Airports />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/viewone/destination"
                element={<Viewonedestination />}
              />
              <Route path="/viewone/hotel" element={<Viewonehotel />} />
              <Route path="/viewone/souvenier" element={<Viewonesouvenier />} />
              <Route path="/souvenierorder" element={<Souvenierorder />} />
              <Route path="/hotelorder" element={<Hotelorder />} />
              <Route path="/destinationorder" element={<DestinationOrder />} />
              <Route path="/viewallorders" element={<Viewallorder />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
