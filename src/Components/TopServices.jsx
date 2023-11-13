import { Box, Img, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setTopService } from "../redux/features/counter";
import { useNavigate } from "react-router-dom";

const TopServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topServices = [
    {
      title: "Hotel",
      imgUrl:
        "https://cf.bstatic.com/psb/capla/static/media/bh_aw_cpg_main_image.b4347622.png",
      url: "#",
      service: "hotel",
    },
    {
      title: "Restaurant",
      imgUrl:
        "https://lh3.googleusercontent.com/p/AF1QipM5WMRpZpf3Sbk_2ogchSd6zZhlz0WbUtl9o99U=s1360-w1360-h1020",
      url: "#",
      service: "restaurant",
    },
    {
      title: "Education",
      imgUrl:
        "https://res.cloudinary.com/buntyy/image/upload/v1698714238/Business-Listing/hwvojhwq9pkmf3uxjli0.png",
      url: "https://www.bmsce.ac.in/",
      service: "education",
    },
    {
      title: "Advertise",
      imgUrl:
        "https://www.feedough.com/wp-content/uploads/2021/08/advertisement-1024x576.png",
      url: "#",
      service: "advertise",
    },
  ];

  const showTopServicePage = (image) => {
    dispatch(setTopService(image));
    navigate("/top-service");
  };
  return (
    <Box p={4} border={"1px"} borderRadius={"lg"} mx={12} mt={8}>
      <Text fontSize="xl" fontWeight="bold" pb={6} textAlign={"center"}>
        Top Serivces
      </Text>
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        justifyContent={"space-between"}
      >
        {topServices.map((image, index) => (
          <Box
            key={index}
            // as={Link}
            href={image.url}
            cursor={"pointer"}
            target="_blank"
            rounded={"lg"}
            overflow={"hidden"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            _hover={{ shadow: "dark-lg" }}
            flex={1}
            onClick={() => {
              showTopServicePage(image);
            }}
          >
            <Img
              rounded={"lg"}
              objectFit="cover"
              aspectRatio={"4/3"}
              src={image.imgUrl}
              alt={image.title}
            />
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {image.title}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TopServices;
