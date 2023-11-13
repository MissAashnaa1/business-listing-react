import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Img,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ToggleColorMode from "./ToggleColorMode";
import { PiArrowSquareDownRight, PiArrowSquareRight } from "react-icons/pi";
import Footer from "./Footer";

import { benefits } from "../data";

const ServiceProviderBenefits = () => {
  const bannerBg = useColorModeValue("gray.500", "gray.700");
  const headingColor = useColorModeValue("#C41E3A", "#E34234");
  const cardBg = useColorModeValue("gray.300", "gray.500");
  const btnBg = useColorModeValue("gray.300", "gray.900");

  return (
    <Box px={12}>
      <Box height={"90vh"}>
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
          height={"70%"}
          bg={bannerBg}
          mt={6}
          display={"flex"}
          alignItems={"stretch"}
          rounded={"lg"}
        >
          <Box
            flex={1}
            // justifyContent={"center"}
            // alignItems={"center"}
            pl={12}
            pt={12}
            height={"100%"}
          >
            <Flex>
              <Heading size="4xl">Want</Heading>
              <Heading
                ml={4}
                fontSize={"2xl"}
                fontWeight={1000}
                alignSelf={"end"}
                color={headingColor}
              >
                to join us ?
              </Heading>
            </Flex>
            <Button
              variant={"ghost"}
              fontSize={"4xl"}
              fontWeight={"extrabold"}
              px={6}
              py={6}
              mt={36}
              bg={btnBg}
            >
              Get Started <PiArrowSquareRight color={headingColor} />
            </Button>
          </Box>
          <Box className="banner-service-provider-reg" flex={1}></Box>
        </Box>
      </Box>

      <Box bg={bannerBg} alignItems={"stretch"} rounded={"lg"} pt={12} pb={12}>
        <Flex width={"100%"} mb={12}>
          <Heading size="3xl" pl={12}>
            Why
          </Heading>
          <Heading
            ml={4}
            fontSize={"2xl"}
            fontWeight={1000}
            alignSelf={"end"}
            color={headingColor}
          >
            ?
          </Heading>
        </Flex>
        <Flex justifyContent={"center"}>
          <VStack width={"80%"} alignSelf={"center"} gap={6}>
            {benefits.map((benefit, index) => (
              <HStack
                key={index}
                width={"65%"}
                bg={cardBg}
                px={6}
                alignSelf={index % 2 === 0 ? "flex-start" : "flex-end"}
                flexDirection={index % 2 === 1 ? "row" : "row-reverse"}
                rounded={"xl"}
              >
                <Box>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    {benefit.title}
                  </Text>
                  <Text fontSize={"lg"}>{benefit.content}</Text>
                </Box>

                <Box>
                  <Box
                    height={"150px"}
                    width={"150px"}
                    bgImage={`url(${benefit.img})`}
                    bgPosition="center"
                    bgSize={"contain"}
                    bgRepeat="no-repeat"
                  ></Box>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Flex>
      </Box>
      <Box
        bg={bannerBg}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        rounded={"lg"}
        pt={12}
        pb={12}
        mt={12}
      >
        <Link to="/service-provider-registration">
          <Button
            variant={"ghost"}
            fontSize={"4xl"}
            fontWeight={"extrabold"}
            px={6}
            py={6}
            bg={btnBg}
          >
            Get Started <PiArrowSquareRight color={headingColor} />
          </Button>
        </Link>
      </Box>

      <Footer />
    </Box>
  );
};

export default ServiceProviderBenefits;
