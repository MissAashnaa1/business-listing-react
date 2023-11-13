import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ToggleColorMode from "./ToggleColorMode";
import Footer from "./Footer";

const Developers = () => {
  return (
    <Box px={12}>
      <Box
        mt={3}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize={["xl", "2xl", "3xl", "4xl"]}
          fontFamily={"work sans"}
          fontWeight={"bold"}
        >
          Business<span style={{ color: "#7E191B" }}>Listing</span>
        </Text>
        <Box
          display={{ base: "none", sm: "none", md: "flex" }}
          flexDir={"row"}
          alignItems={"center"}
          size="sm"
          gap={4}
        >
          <Link to="/">
            <Button variant={"solid"} px={4} fontWeight={"bold"}>
              Home
            </Button>
          </Link>
          <ToggleColorMode />
        </Box>
      </Box>
      <Box
        height={"60vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://res.cloudinary.com/buntyy/image/upload/v1698913900/Business-Listing/kjbujt3psr34cihahrf3.jpg"
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Heading size="md">Aashnaa Goswami</Heading>

                <Button
                  as={ChakraLink}
                  href="https://www.linkedin.com/in/aashnaa-goswami-97209a201/"
                  target="_blank"
                >
                  ln/aashnaa-goswami-97209a201/
                </Button>
              </CardBody>
            </Stack>
          </Card>

          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://res.cloudinary.com/buntyy/image/upload/v1698677423/Business-Listing/wpfw9bi334c4bbw0mnhu.png"
              alt="Hitesh Attri"
            />

            <Stack>
              <CardBody>
                <Heading size="md">Hitesh Attri</Heading>
                <Button
                  as={ChakraLink}
                  href="https://www.linkedin.com/in/hitesh-attri/"
                  target="_blank"
                >
                  ln/hitesh-attri/
                </Button>
              </CardBody>
            </Stack>
          </Card>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Developers;
