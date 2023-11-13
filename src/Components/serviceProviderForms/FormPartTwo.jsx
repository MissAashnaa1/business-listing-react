import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const FormPartTwo = ({
  stAddress,
  setStAddress,
  city,
  setCity,
  state,
  setState,
  zip,
  setZip,
}) => {
  return (
    <Box>
      <Flex gap={6} mb={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="stAddress">Street Address</FormLabel>
          <Input
            type="text"
            id="stAddress"
            placeholder="Enter your St. Address"
            value={stAddress}
            onChange={(e) => setStAddress(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={6} mb={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            type="tel"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="state">State</FormLabel>
          <Input
            type="text"
            id="state"
            placeholder="Enter your state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="zip">ZIP/Postal</FormLabel>
          <Input
            type="number"
            id="zip"
            placeholder="Enter your ZIP"
            value={zip}
            onChange={(e) =>
              setZip(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default FormPartTwo;
