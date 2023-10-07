import { Box } from "@chakra-ui/react";
import { Carousel } from "antd";
import React from "react";

const CarouslNCards = () => {
  return (
    <Box
      mt={12}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"row"}
      gap={4}
    >
      <Box
        height={"25vh"}
        bg="skyblue"
        flex={4}
        rounded={"xl"}
        overflow={"hidden"}
        // padding={2}
      >
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </Box>
      <Box
        height={"25vh"}
        bg="skyblue"
        flex={1}
        rounded={"xl"}
        overflow={"hidden"}
      >
        <div>
          <h3 style={contentStyle}>5</h3>
        </div>
      </Box>
      <Box
        height={"25vh"}
        bg="skyblue"
        flex={1}
        rounded={"xl"}
        overflow={"hidden"}
      >
        <div>
          <h3 style={contentStyle}>6</h3>
        </div>
      </Box>
      <Box
        height={"25vh"}
        bg="skyblue"
        flex={1}
        rounded={"xl"}
        overflow={"hidden"}
      >
        <div>
          <h3 style={contentStyle}>7</h3>
        </div>
      </Box>
      <Box
        height={"25vh"}
        bg="skyblue"
        flex={1}
        rounded={"xl"}
        overflow={"hidden"}
      >
        <div>
          <h3 style={contentStyle}>8</h3>
        </div>
      </Box>
    </Box>
  );
};

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "25vh",
  textAlign: "center",
  background: "#364d79",
};

export default CarouslNCards;
