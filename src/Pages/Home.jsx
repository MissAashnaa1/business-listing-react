import { Box, Container, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import SearchComp from "../Components/SearchComp";
import CarouslNCards from "../Components/CarouslNCards";
import IconsComp from "../Components/IconsComp";
import LgCards from "../Components/LgCards";
import LgCadsTwo from "../Components/LgCadsTwo";
import SocialLinks from "../Components/SocialLinks";
import Footer from "../Components/Footer";
import Welcome from "../Components/Welcome";
import AccordionComp from "../Components/AccordionComp";
import Profile from "../Components/Profile";
import { Toaster } from "react-hot-toast";
import Feedback from "../Components/Feedback";
import ReactGA from "react-ga";
import TopServices from "../Components/TopServices";

const Home = () => {
  const [showMain, setShowMain] = useState(true);
  const handleToggle = () => setShowMain(!showMain);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <Toaster />
      {showMain ? (
        <Container maxW="100%">
          <Header handleToggle={handleToggle} />
          {/* <SearchComp /> */}
          {/* <Box display={{ base: "none", md: "block" }}> */}
          <CarouslNCards />
          {/* </Box> */}
          {/* <Box>
            <IconsComp />
          </Box> */}
          {/* <LgCards /> */}
          <TopServices />
          {/* <LgCadsTwo /> */}

          <Divider my={6} />
          <Welcome />
          <Feedback />
          {/* <AccordionComp /> */}
          <SocialLinks />
          <Footer />
        </Container>
      ) : (
        <Profile handleToggle={handleToggle} />
      )}
    </>
  );
};

export default Home;
