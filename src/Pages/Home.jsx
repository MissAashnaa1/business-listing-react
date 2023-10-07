import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Header from "../Components/Header";
import SearchComp from "../Components/SearchComp";
import CarouslNCards from "../Components/CarouslNCards";
import IconsComp from "../Components/IconsComp";
import LgCards from "../Components/LgCards";
import LgCadsTwo from "../Components/LgCadsTwo";
import SocialLinks from "../Components/SocialLinks";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <Container maxW="100%" bg={"white"}>
      <Header />
      <SearchComp />
      <Box display={{ base: "none", md: "block" }}>
        <CarouslNCards />
      </Box>
      <Box>
        <IconsComp />
      </Box>
      <LgCards />
      <LgCadsTwo />
      <SocialLinks />
      <Footer />
    </Container>
  );
};

export default Home;
