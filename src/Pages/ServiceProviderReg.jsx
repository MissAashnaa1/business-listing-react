import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToggleColorMode from "../Components/ToggleColorMode";
import Footer from "../Components/Footer";
import FormPartOne from "../Components/serviceProviderForms/FormPartOne";
import FormPartTwo from "../Components/serviceProviderForms/FormPartTwo";
import FormPartThree from "../Components/serviceProviderForms/FormPartThree";
import verifyEmail from "../apis/verifyEmail";
import axios from "axios";
import { BASE_URL } from "../constants";

const ServiceProviderReg = () => {
  const toast = useToast();
  const bannerBg = useColorModeValue("gray.500", "gray.700");
  const headingColor = useColorModeValue("#C41E3A", "#E34234");
  const formColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.200");

  const [form, setForm] = useState("partOne");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stAddress, setStAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [category, setCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [tnc, setTnc] = useState(false);

  const [errObj, setErrObj] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
    stAddress: false,
    city: false,
    state: false,
    zip: false,
    category: false,
    serviceName: false,
    website: false,
    about: false,
  });

  const showForm = (form) => {
    switch (form) {
      case "partOne":
        return (
          <FormPartOne
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassowrd={setPassowrd}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            errObj={errObj}
            setErrObj={setErrObj}
          />
        );
      case "partTwo":
        return (
          <FormPartTwo
            stAddress={stAddress}
            setStAddress={setStAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zip={zip}
            setZip={setZip}
            errObj={errObj}
            setErrObj={setErrObj}
          />
        );
      case "partThree":
        return (
          <FormPartThree
            category={category}
            setCategory={setCategory}
            serviceName={serviceName}
            setServiceName={setServiceName}
            website={website}
            setWebsite={setWebsite}
            about={about}
            setAbout={setAbout}
            tnc={tnc}
            setTnc={setTnc}
          />
        );

      default:
        break;
    }
  };

  const handleCancel = () => {
    setForm("partOne");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassowrd("");
    setConfirmPassword("");
    setStAddress("");
    setCity("");
    setState("");
    setZip("");
    setCategory("");
    setServiceName("");
    setWebsite("");
    setAbout("");
    setTnc(false);
  };

  const handlePartOne = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      phone === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      if (firstName === "") setErrObj({ ...errObj, firstName: true });
      if (lastName === "") setErrObj({ ...errObj, lastName: true });
      if (phone === "") setErrObj({ ...errObj, phone: true });
      if (email === "") setErrObj({ ...errObj, email: true });
      if (password === "") setErrObj({ ...errObj, password: true });
      if (confirmPassword === "")
        setErrObj({ ...errObj, confirmPassword: true });

      return;
    }

    if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      toast({
        title: "Error",
        description: "Please enter a valid email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setErrObj({ ...errObj, email: true });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setErrObj({ ...errObj, confirmPassword: true });
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await verifyEmail(email);
      if (data.success) {
        setForm("partTwo");
      } else {
        toast({
          title: "Error",
          description: data.msg,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setErrObj({ ...errObj, email: true });
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setErrObj({ ...errObj, email: true });
      return;
    } finally {
      setIsSubmitting(false);
    }

    // setForm("partTwo");
  };

  const hanldePartTwo = async () => {
    if (
      stAddress.trim() === "" ||
      city.trim() === "" ||
      state.trim() === "" ||
      zip.trim() === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      if (stAddress === "") setErrObj({ ...errObj, stAddress: true });
      if (city === "") setErrObj({ ...errObj, city: true });
      if (state === "") setErrObj({ ...errObj, state: true });
      if (zip === "") setErrObj({ ...errObj, zip: true });

      return;
    }

    setForm("partThree");
  };

  const handlePartThree = async () => {
    console.log({
      category,
      serviceName,
      website,
      about,
    });
    if (
      category.trim() === "" ||
      serviceName.trim() === "" ||
      website.trim() === "" ||
      about.trim() === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      if (category === "") setErrObj({ ...errObj, category: true });
      if (serviceName === "") setErrObj({ ...errObj, serviceName: true });
      if (website === "") setErrObj({ ...errObj, website: true });
      if (about === "") setErrObj({ ...errObj, about: true });

      return;
    }

    if (!tnc) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/service-provider/register`,
        {
          firstName,
          lastName,
          phone,
          email,
          password,
          stAddress,
          city,
          state,
          zip,
          category,
          serviceName,
          website,
          about,
        }
      );

      console.log(data);
      toast({
        title: "Success",
        description:
          "You have been registered successfully. Verify your email.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleCancel();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Box px={12}>
        <Box
          mt={3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text
            fontSize={["xl", "2xl", "3xl", "4xl"]}
            fontFamily={"work sans"}
            fontWeight={"bold"}
          >
            Business<span style={{ color: "#7E191B" }}>Listing</span>
          </Text>
          <Box
            display={{ base: "none", sm: "none", md: "flex" }}
            flexDir={"row"}
            alignItems={"center"}
            size="sm"
            gap={4}
          >
            <Link to="/">
              <Button variant={"solid"} px={4} fontWeight={"bold"}>
                Home
              </Button>
            </Link>
            <ToggleColorMode />
          </Box>
        </Box>
        <Box p={12} bg={bannerBg} mt={6} rounded={"lg"}>
          <Center>
            <Heading fontSize={"2xl"}>Service Provider Details</Heading>
          </Center>
          <Flex flexDirection={"row-reverse"}>
            <Text bg={formColor} px={12} rounded={"lg"}>
              {form === "partOne" ? "1" : form === "partTwo" ? "2" : "3"}/3
            </Text>
          </Flex>
          <Center>
            <Box mt={6} bg={formColor} rounded="lg" p={6} width={"60%"}>
              {showForm(form)}
              <Flex
                justifyContent={"space-between"}
                flexDirection={"row-reverse"}
              >
                <ButtonGroup>
                  <Button
                    variant={"solid"}
                    px={4}
                    fontWeight={"bold"}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={isSubmitting}
                    variant={"solid"}
                    px={4}
                    fontWeight={"bold"}
                    colorScheme={"blue"}
                    onClick={() =>
                      form === "partOne"
                        ? handlePartOne()
                        : form === "partTwo"
                        ? hanldePartTwo()
                        : handlePartThree()
                    }
                  >
                    {form === "partOne"
                      ? "Next"
                      : form === "partTwo"
                      ? "Next"
                      : "Submit"}
                  </Button>
                </ButtonGroup>
                {form === "partThree" || form === "partTwo" ? (
                  <Button
                    variant={"solid"}
                    px={4}
                    fontWeight={"bold"}
                    colorScheme={"blue"}
                    onClick={() =>
                      form === "partThree"
                        ? setForm("partTwo")
                        : form === "partTwo"
                        ? setForm("partOne")
                        : null
                    }
                  >
                    Previous
                  </Button>
                ) : null}
              </Flex>
            </Box>
          </Center>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ServiceProviderReg;
