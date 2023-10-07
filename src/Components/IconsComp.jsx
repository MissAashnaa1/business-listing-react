import { Box, Button, Img, Link, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { images } from "../data";
import { FaTruck } from "react-icons/fa";

const IconsComp = () => {
  return (
    <Box mt={12} px={{ md: 8, xl: 16 }}>
      <SimpleGrid
        columns={{ base: 3, sm: 4, md: 6, lg: 8, xl: 10 }}
        spacing={7}
        px={{ base: 2, sm: 2, lg: 1 }}
      >
        {images.map((image, index) => {
          return (
            <Box
              as={Link}
              key={index}
              overflow={"hidden"}
              _hover={{ boxShadow: "dark-lg" }}
              rounded={"lg"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Img
                rounded={"lg"}
                boxSize="100px"
                objectFit="cover"
                src={image.src}
                alt="Packers and Movers"
              />
              <Text
                mt={2}
                fontSize={"sm"}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                {image.title}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default IconsComp;
