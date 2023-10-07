import { Avatar, Box, Img, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import GetOnPlayStore from "../assets/google-play-badge/google-play-badge/google-play-badge.svg";
import GetOnAppStore from "../assets/app-store-badge/app-store-badge/app-store-badge.svg";

const SocialLinks = () => {
  return (
    <Box
      mt={14}
      px={{ base: 2, sm: 3, md: 6, lg: 12 }}
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        spacing={{ base: 2, md: 6 }}
        alignItems={"center"}
      >
        <Text fontSize={"xl"} fontWeight={"900"}>
          Follow us on
        </Text>
        <Link href="#">
          <Avatar src={"https://bit.ly/broken-link"} />
        </Link>
        <Link href="#">
          <Avatar src={"https://bit.ly/broken-link"} />
        </Link>
        <Link href="#">
          <Avatar src={"https://bit.ly/broken-link"} />
        </Link>
        <Link href="#">
          <Avatar src={"https://bit.ly/broken-link"} />
        </Link>
      </Stack>
      <Box display={"flex"} gap={4}>
        <Link to="#">
          <Img
            h="7rem"
            src={GetOnPlayStore}
            alt={"download app on play store"}
          />
        </Link>

        <Link to="#">
          <Img
            h="7rem"
            src={GetOnAppStore}
            alt={"download app on play store"}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default SocialLinks;
