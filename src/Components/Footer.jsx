import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box mt={12} px={{ base: 2, sm: 3, md: 6, lg: 12 }} mb={6}>
      <Box display={"flex"} alignItems={"center"} py={6}>
        <Box paddingRight={12}>
          <Text fontSize={"2xl"} fontWeight={"extrabold"}>
            Quick Links
          </Text>
          <SimpleGrid columns={2} spacing={2} spacingX={8}>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
          </SimpleGrid>
        </Box>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"extrabold"}>
            BL Verticals
          </Text>
          <SimpleGrid
            columns={3}
            spacing={2}
            spacingX={{ base: 3, sm: 4, lg: 12, md: 24 }}
          >
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
            <Button variant={"link"}>Home</Button>
          </SimpleGrid>
        </Box>
      </Box>

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
