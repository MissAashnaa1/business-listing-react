import {
  Box,
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import sendMessage from "../apis/sendMessage";

const Feedback = () => {
  const toast = useToast();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async () => {
    if (!firstname || !lastname || !email || !message) {
      toast({
        title: "!",
        description: "Please fill out all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const data = await sendMessage(firstname, lastname, email, message);
      console.log(data);
      toast({
        title: "Success!",
        description: "Message sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error!",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box
      mt={14}
      px={{ base: 2, sm: 3, md: 6, lg: 12 }}
      display={{ base: "none", sm: "flex" }}
      flexDirection={{ base: "column" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack width={"70%"} s shadow={"dark-lg"} px={8} py={4} rounded={"lg"}>
        <Center mb={3}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Have something to say?
          </Text>
        </Center>
        <HStack spacing={3} width={"100%"}>
          <FormControl isRequired>
            <FormLabel htmlFor="firstname">Firstname</FormLabel>
            <Input
              type="text"
              id="firstname"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) =>
                setFirstName(
                  e.target.value.replace(/[^a-zA-Z ]/g, "").toUpperCase()
                )
              }
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="lastname">Lastname</FormLabel>
            <Input
              type="text"
              id="lastname"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) =>
                setLastName(
                  e.target.value.replace(/[^a-zA-Z ]/g, "").toUpperCase()
                )
              }
            />
            <FormErrorMessage>Required</FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <HStack width={"100%"} justifyContent={"space-between"}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Text fontSize={"sm"} color={"gray.500"}>
              {message.length}/300
            </Text>
          </HStack>
          <Textarea
            type="text"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            overflow={"auto"}
            height={"100px"}
            maxHeight={"200px"}
            maxLength={300}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>
        <HStack width={"100%"} flexDirection={"row-reverse"}>
          <ButtonGroup>
            <Button colorScheme={"gray"} onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button
              colorScheme={"blue"}
              onClick={() => handleMessage()}
              isLoading={loading}
              loadingText="Sending"
            >
              Send
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Feedback;
