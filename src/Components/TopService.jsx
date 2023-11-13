import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BASE_URL } from "../constants";

const TopService = () => {
  const { topService } = useSelector((state) => state.counter);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const addComment = async () => {
    try {
      let { data } = await axios.post(`${BASE_URL}/api/v1/comments/add`, {
        user: "6543a1d2c9fe1ef8544d0b10",
        comment: comment,
        category: topService.service,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          `${BASE_URL}/api/v1/comments/get-all?category${topService.service}`
        );
        setComments(data);
        console.log(data, "< comments");
      } catch (error) {
        console.log(error, "< error in getting commnts");
      }
    })();
  }, []);
  return (
    <Box px={12}>
      <Header />

      <Box>
        <HStack
          gap={3}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box flex={1}>
            <Image src={topService.imgUrl} maxHeight={"400px"} />
          </Box>
          <Box flex={1} p={6}>
            <Heading as={"h2"} size={"lg"} pb={4}>
              {topService.title}
            </Heading>

            <HStack>
              <StarIcon color={"yellow.400"} />
              <StarIcon color={"yellow.400"} />
              <StarIcon color={"yellow.400"} />
              <StarIcon color={"yellow.400"} />
              <StarIcon color={"yellow.100"} />
            </HStack>
          </Box>
        </HStack>

        <Box p={6}>
          <Text>Comments: </Text>
          <FormControl>
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter your comment"
                onChange={(e) => setComments(e.target.value)}
              />
              <Button onClick={addComment}>Comment</Button>
            </InputGroup>
          </FormControl>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default TopService;
