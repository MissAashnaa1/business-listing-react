import { Box, Center, Image, Spinner } from "@chakra-ui/react";
import Carousel from "nuka-carousel";

import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { BASE_URL } from "../constants";
import io from "socket.io-client";
const socket = io(BASE_URL);

const CarouslNCards = () => {
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("updateAdImgStatusToClient", (data) => {
      console.log(data, "<< data from socket");
      setImageData(
        data.adList.map((item) => {
          return {
            label: item.label,
            alt: item.alt,
            url: item.url,
          };
        })
      );
      setImageData((prev) => [
        ...prev,
        ...data.adlistApplied.map((item) => {
          return {
            label: item.adLabel,
            alt: item.adLabel,
            url: item.adURL,
          };
        }),
      ]);
    });

    axios
      .get(`${BASE_URL}/api/v1/adImage`)
      .then((res) => {
        console.log(res.data);
        // setImageData(res.data.images);
        setImageData(
          res.data.adList.map((item) => {
            return {
              label: item.label,
              alt: item.alt,
              url: item.url,
            };
          })
        );
        setImageData((prev) => [
          ...prev,
          ...res.data.adlistApplied.map((item) => {
            return {
              label: item.adLabel,
              alt: item.adLabel,
              url: item.adURL,
            };
          }),
        ]);
      })
      .catch((err) => {
        console.log(err, "<< error in getting ad-banner");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Center>
        {loading ? (
          <Spinner size="xl" />
        ) : imageData.length > 0 ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={4}
            width={"60%"}
            justifyContent={"center"}
          >
            <Carousel cellAlign="center" widht={"70%"} autoplay wrapAround>
              {imageData.map((image, i) => (
                <Center
                  key={i}
                  flexDirection={"column"}
                  m={8}
                  verticalAlign={"center"}
                  height={"70%"}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    style={{
                      maxHeight: "90%",
                      maxWidth: "90%",
                      objectFit: "fill",
                    }}
                  />
                  <p className="legend">{image.label}</p>
                </Center>
              ))}
            </Carousel>
          </Box>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={4}
            width={"70%"}
            justifyContent={"center"}
          >
            Images not available
          </Box>
        )}
      </Center>
    </>
  );
};

export default CarouslNCards;
