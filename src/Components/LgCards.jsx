import { Box, Img, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LgCardObj } from "../data";

const LgCards = () => {
  return (
    <Box mt={12} px={{ base: 2, sm: 3, md: 6, lg: 12 }}>
      <SimpleGrid
        columns={{ base: 2, md: 1, lg: 2 }}
        spacing={{ base: 1, sm: 2, md: 3, lg: 6 }}
      >
        {LgCardObj.map((card, i) => (
          <Box p={4} border={"1px"} borderRadius={"lg"} key={i}>
            <Text fontSize="xl" fontWeight="bold" pb={6} textAlign={"center"}>
              {card.heading}
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              justifyContent={"space-between"}
            >
              {card.content.map((image, index) => (
                <Box
                  key={Date.now() + index}
                  as={Link}
                  rounded={"lg"}
                  overflow={"hidden"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  _hover={{ shadow: "dark-lg" }}
                >
                  <Img
                    height={"130px"}
                    rounded={"lg"}
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
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LgCards;
