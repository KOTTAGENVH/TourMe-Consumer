import React, { useState } from "react";
import Header from "../../Components/Header";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Footer from "../../Components/Footer";

function AboutSriLanka() {
  const darkmode = useSelector((state) => state.darkmode.darkmode);
 
  const handleDarkmode = () => {
    if (darkmode) {
      return "white";
    } else {
      return "black";
    }
  };



  return (
    <div
      style={{
        height: "",
      }}
    >
      <Header />
      <Box
        sx={{
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
          padding: "20px",
          width: "80%",
          margin: "auto",
          marginTop: "50px",
          marginBottom: "50px",
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
          backdropFilter: "blur(10px)",
          color: handleDarkmode(),
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: "20px" }}>
          About Sri Lanka
        </Typography>
        <img
          alt="Sri Lanka"
          src="https://www.slhcpakistan.org/wp-content/uploads/2016/01/dilshan-chathuranga-udawatta-ayubowan-srilanka-hd-1080-1.jpg"
          style={{
            width: "80%",
            height: "60vh",
            backgroundSize: "cover",
            borderRadius: "20px",
          }}
        />
        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          Sri Lanka, officially the Democratic Socialist Republic of Sri Lanka
          (known as Ceylon before 1972) is an island nation in South Asia,
          located about 31 kilometres (19.3 mi) off the southern coast of India.
          Popularly referred to as the Pearl of the Indian Ocean, it is home to
          around twenty million people. Due to its location in the path of major
          sea routes, Sri Lanka is a strategic naval link between West Asia and
          South East Asia, and has been a center of Buddhist religion and
          culture from ancient times. Today, the country is a multi-religious
          and multi-ethnic nation, with nearly a third of the population
          following faiths other than Buddhism, notably Hinduism, Christianity
          and Islam. The Sinhalese community forms the majority of the
          population, with Tamils, who are concentrated in the north and east of
          the island, forming the largest ethnic minority. Other communities
          include the Muslim Moors and Malays and the Burghers. Famous for the
          production and export of tea, coffee, rubber and coconuts, Sri Lanka
          boasts a progressive and modern industrial economy and the highest per
          capita income in South Asia. The natural beauty of Sri Lanka’s
          tropical forests, beaches and landscape, as well as its rich cultural
          heritage, make it a world famous tourist destination. After over two
          thousand years of rule by local kingdoms, parts of Sri Lanka were
          colonized by Portugal and the Netherlands beginning in the 16th
          century, before the control of the entire country was ceded to the
          British Empire in 1815. During World War II, Sri Lanka served as an
          important base for Allied forces in the fight against the Japanese
          Empire. A nationalist political movement arose in the country in the
          early 20th century with the aim of obtaining political independence,
          which was eventually granted by the British after peaceful
          negotiations in 1948. Sri Lanka, officially the Democratic Socialist
          Republic of Sri Lanka (known as Ceylon before 1972) is an island
          nation in South Asia, located about 31 kilometres (19.3 mi) off the
          southern coast of India. Popularly referred to as the Pearl of the
          Indian Ocean, it is home to around twenty million people. Due to its
          location in the path of major sea routes, Sri Lanka is a strategic
          naval link between West Asia and South East Asia, and has been a
          center of Buddhist religion and culture from ancient times. Today, the
          country is a multi-religious and multi-ethnic nation, with nearly a
          third of the population following faiths other than Buddhism, notably
          Hinduism, Christianity and Islam. The Sinhalese community forms the
          majority of the population, with Tamils, who are concentrated in the
          north and east of the island, forming the largest ethnic minority.
          Other communities include the Muslim Moors and Malays and the
          Burghers. Famous for the production and export of tea, coffee, rubber
          and coconuts, Sri Lanka boasts a progressive and modern industrial
          economy and the highest per capita income in South Asia. The natural
          beauty of Sri Lanka’s tropical forests, beaches and landscape, as well
          as its rich cultural heritage, make it a world famous tourist
          destination. After over two thousand years of rule by local kingdoms,
          parts of Sri Lanka were colonized by Portugal and the Netherlands
          beginning in the 16th century, before the control of the entire
          country was ceded to the British Empire in 1815. During World War II,
          Sri Lanka served as an important base for Allied forces in the fight
          against the Japanese Empire. A nationalist political movement arose in
          the country in the early 20th century with the aim of obtaining
          political independence, which was eventually granted by the British
          after peaceful negotiations in 1948.
        </Typography>

        <span>
          &copy; Note: Image and text taken from Sri-Lankan High Commission in
          Pakistan(Website). Link:
          https://www.slhcpakistan.org/discover-sri-lanka-wonder-of-asia/
        </span>
      </Box>
      <Footer />
    </div>
  );
}

export default AboutSriLanka;
