import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

const FormPartOne = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassowrd,
  confirmPassword,
  setConfirmPassword,
  errObj,
  setErrObj,
}) => {
  return (
    <Box>
      <Flex gap={6} mb={6}>
        <FormControl isRequired isInvalid={errObj.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            type="text"
            id="firstName"
            placeholder="Enter your firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            id="lastName"
            placeholder="Enter your lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={6} mb={6}>
        <FormControl isRequired flex={1}>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input
            type="tel"
            id="phone"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/, "").slice(0, 10))
            }
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired flex={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap={6} mb={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default FormPartOne;
