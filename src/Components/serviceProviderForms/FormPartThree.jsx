import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

const FormPartThree = ({
  category,
  setCategory,
  serviceName,
  setServiceName,
  website,
  setWebsite,
  about,
  setAbout,
  tnc,
  setTnc,
}) => {
  return (
    <Box>
      <Flex gap={6} mb={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="cagory">Service Category</FormLabel>
          <Input
            type="text"
            id="category"
            placeholder="Select your service category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="serviceName">Service Name</FormLabel>
          <Input
            type="text"
            id="serviceName"
            placeholder="Enter your service name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={6} mb={6}>
        <FormControl isRequired flex={1}>
          <FormLabel htmlFor="phone">Website</FormLabel>
          <Input
            type="url"
            id="phone"
            placeholder="https://my-business-website.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={6} mb={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="about">About</FormLabel>
          <Textarea
            type="text"
            id="about"
            placeholder="My service is about..."
            maxLength={300}
            maxHeight={"150px"}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <Flex flexDirection={"row-reverse"}>
            <Text>00/300</Text>
          </Flex>
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>
      <FormControl isRequired mb={6}>
        <Checkbox onChange={(e) => setTnc(e.target.checked)} checked={tnc}>
          <Text>
            I agree to the{" "}
            <span style={{ color: "#7CB9E8" }}>Terms and Conditions</span>
          </Text>
        </Checkbox>
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default FormPartThree;
