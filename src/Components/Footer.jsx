import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Divider } from "antd";
import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box mt={12} px={{ base: 2, sm: 3, md: 6, lg: 12 }} mb={6}>
      <Divider />
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        py={6}
        // justifyContent={"flex-start"}
        gap={12}
      >
        <Flex
          paddingRight={12}
          flexDirection={"column"}
          alignItems={"flex-start"}
        >
          <Text fontSize={"2xl"} fontWeight={"extrabold"}>
            Quick Links
          </Text>
          <SimpleGrid columns={1} spacing={2} spacingX={8}>
            <a href="#">
              <Button variant={"link"}>About Us</Button>
            </a>
            <a href="/#contact-us">
              <Button variant={"link"}>Contact Us</Button>
            </a>
            <a href="#">
              <Button variant={"link"}>Privacy Policy</Button>
            </a>
          </SimpleGrid>
        </Flex>

        <Flex flexDirection={"column"}>
          <Text fontSize={"2xl"} fontWeight={"extrabold"}>
            Services
          </Text>
          <SimpleGrid
            columns={1}
            spacing={2}
            spacingX={{ base: 3, sm: 4, lg: 12, md: 24 }}
          >
            <Link to="/join-us">
              <Button variant={"link"}>Apply For Ads</Button>
            </Link>
            <a href="https://www.bmsce.ac.in/" target="_blank" rel="noopener">
              <Button variant={"link"}>Know More About Our College</Button>
            </a>
            <Link to="/developers">
              <Button variant={"link"}>Developers</Button>
            </Link>
            <a href="#" target="_blank" rel="noopene">
              <Button variant={"link"}>Restaurant</Button>
            </a>
            <a href="#" target="_blank" rel="noopene">
              <Button variant={"link"}>Dental</Button>
            </a>
            <a href="#" target="_blank" rel="noopene">
              <Button variant={"link"}>Hotel</Button>
            </a>
          </SimpleGrid>
        </Flex>
      </Box>

      <Divider />

      <Text>
        Copyrights 2023-24. All Rights Reserved. |{" "}
        <Button size="sm" variant={"link"}>
          Privacy
        </Button>{" "}
        |{" "}
        <Button size="sm" variant={"link"}>
          Terms
        </Button>{" "}
        |{" "}
        <Button size="sm" variant={"link"}>
          Terms
        </Button>{" "}
        |{" "}
        <Button size="sm" variant={"link"}>
          Infringement
        </Button>
      </Text>
    </Box>
  );
};

export default Footer;
