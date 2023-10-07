import { Box, HStack, Img, Link, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { billNRecharge, travelBooking } from "../data";
import { Divider } from "antd";

const LgCadsTwo = () => {
  return (
    <Box mt={14} px={{ base: 2, sm: 3, md: 6, lg: 12 }}>
      <Box
        rounded={"lg"}
        border={"1px"}
        display={"flex"}
        flexDirection={{ base: "row", md: "column" }}
      >
        <Box
          display={"flex"}
          alignItems={{ base: "flex-start", lg: "center" }}
          borderBottom={{ base: "none", md: "1px" }}
          py={6}
          px={{ base: 2, md: 4, lg: 8 }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"900"}>
              Bills & Recharge
            </Text>
            <Text fontSize={"sm"} fontWeight={""}>
              Pay your bills & recharge instantly
            </Text>
            <Text as={Link} color={"blue"} href="#" fontWeight={600}>
              Explore More
            </Text>
          </VStack>
          <Stack direction={{ base: "column", md: "row" }}>
            {billNRecharge.map((image, index) => (
              <Box
                key={Date.now() + index}
                as={Link}
                rounded={"lg"}
                // overflow={"hidden"}
                display={"flex"}
                flexDirection={{ base: "column", sm: "row", md: "column" }}
                alignItems={"center"}
                _hover={{ shadow: "2xl" }}
              >
                <Img
                  height={{ base: "70px", lg: "100px" }}
                  rounded={"lg"}
                  p={2}
                  objectFit="cover"
                  src={image.src}
                  alt="Hall"
                />
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  {image.title}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          display={"flex"}
          py={6}
          px={8}
          alignItems={{ base: "flex-start", lg: "center" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"900"}>
              Travel Bookings
            </Text>
            <Text fontSize={"sm"} fontWeight={""}>
              Instant ticket booking for your best travel experience
            </Text>
            <Text as={Link} color={"blue"} href="#" fontWeight={600}>
              Explore More
            </Text>
          </VStack>
          <Stack direction={{ base: "column", md: "row" }}>
            {travelBooking.map((image, index) => (
              <Box
                key={Date.now() + index}
                rounded={"lg"}
                // overflow={"hidden"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                _hover={{ shadow: "2xl" }}
              >
                <Box
                  as={Link}
                  display={"flex"}
                  flexDirection={{ base: "column", sm: "row", md: "column" }}
                  alignItems={"center"}
                >
                  <Img
                    height={{ base: "70px", lg: "100px" }}
                    rounded={"lg"}
                    p={2}
                    objectFit="cover"
                    src={image.src}
                    alt="Hall"
                  />
                  <Text fontSize={"lg"} fontWeight={"bold"}>
                    {image.title}
                  </Text>
                </Box>
                <Text fontSize={"12px"} textAlign={"center"}>
                  {image.poweredBy}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default LgCadsTwo;
