import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToggleColorMode from "../Components/ToggleColorMode";
import { useSelector } from "react-redux";
import {
  AASHNAA_IMG,
  BASE_URL,
  CLOUD_NAME,
  PIC_PATH,
  PIC_UPLOAD_URL,
  RAZORPAY_SRC,
  UPLOAD_PRESET,
} from "../constants";
import axios from "axios";
import { Select } from "chakra-react-select";
import Footer from "../Components/Footer";
import { Image } from "antd";

const AdRegistration = () => {
  const toast = useToast();
  const { isAuthenticated } = useSelector((state) => state.counter);
  const [profileLoading, setProfileLoading] = useState(true);
  const [planList, setPlanList] = useState([]);
  const [planObj, setPlanObj] = useState(null);
  const [adLabel, setAdLabel] = useState("");
  const [adImage, setAdImage] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [user, setUser] = useState({});
  const [appliedAds, setAppliedAds] = useState([]);

  const bannerBg = useColorModeValue("gray.500", "gray.700");
  const formColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.200");

  const getAppliedAds = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/get-applied-ads`,
        { userId: user._id },
        { withCredentials: true }
      );
      console.log(data, "<< applied ads");
      setAppliedAds(data.appliedAds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppliedAds();
    (async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/user/get-my-profile`,
          {
            withCredentials: true,
          }
        );

        const plansRes = await axios.get(`${BASE_URL}/api/v1/admin/ad-plans`);
        setPlanList(
          plansRes.data.plans.map((plan) => {
            return {
              value: plan._id,
              label: `${plan.name}, Rs${plan.price}, ${plan.durationDays} days`,
            };
          })
        );

        console.log(data, "< user data");
        setUser(data.user);
      } catch (error) {
        console.log(error, "< error in getting user profile");
      } finally {
        setProfileLoading(false);
      }
    })();
  }, []);

  const applyForAd = async () => {
    if (!adImage || !adLabel || !planObj) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (
        (adImage && adImage.type === "image/jpeg") ||
        adImage.type === "image/png"
      ) {
        setLocalLoading(true);
        const data = new FormData();
        data.append("file", adImage);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUD_NAME);
        data.append("folder", PIC_PATH);

        const res = await axios.post(PIC_UPLOAD_URL, data);

        const picURL = res.data.url;
        console.log(picURL);
        const res2 = await axios.post(
          `${BASE_URL}/api/v1/user/apply-for-ad`,
          { userId: user._id, adLabel, adImage: picURL, planObj },
          {
            withCredentials: true,
          }
        );

        console.log(res2.data, "< res after applying for ad");
        toast({
          title: "Applied for ad successfully. Check your email",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Please upload a valid image",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.log(error, "< error in applying for ad");
      toast({
        title: "Error in applying for ad",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLocalLoading(false);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript(RAZORPAY_SRC);
  });

  const handleRazorPay = async (amount, adId) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/payment/checkout`, {
        amount: amount,
        currency: "INR",
      });
      console.log(res.data, " < order");

      const { data } = await axios.get(`${BASE_URL}/api/v1/payment/get-key`);
      console.log(data, " < razorpay key");

      const options = {
        key: data.key,
        amount: res.data.order.amount,
        currency: "INR",
        name: "Business Listing",
        description: "Test Transaction",
        image: AASHNAA_IMG,
        order_id: res.data.id,
        callback_url: `${BASE_URL}/api/v1/payment/payment-verification/${adId}`,
        prefill: {
          name: "Test User",
          email: "Test user Email",
          contact: "Test use contact",
        },
        notes: {
          address: "Razorpay office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log(options, "options");

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      {profileLoading ? (
        <Box
          height={"40vh"}
          width={"100vw"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <Box p={12} bg={bannerBg} mt={6} rounded={"lg"}>
            <Center>
              <Heading fontSize={"2xl"}>Apply for Ads</Heading>
            </Center>
            <Center>
              <Box mt={6} bg={formColor} rounded="lg" p={6} width={"60%"}>
                <Flex gap={6} mb={6}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="adLabel">Ad Label</FormLabel>
                    <Input
                      id="adLabel"
                      type="text"
                      placeholder="Ad Label"
                      onChange={(e) => setAdLabel(e.target.value)}
                    />
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="adImage">Ad Image</FormLabel>
                    <Input
                      id="adImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setAdImage(e.target.files[0]);
                      }}
                    />
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>
                </Flex>

                <FormControl isRequired>
                  <FormLabel htmlFor={"adPlan"}>Plans</FormLabel>
                  <Select
                    id={"adPlan"}
                    name="adplan"
                    options={planList}
                    onChange={(obj) => {
                      setPlanObj(obj);
                    }}
                  />
                  <FormErrorMessage>Required</FormErrorMessage>
                </FormControl>

                <Button
                  mt={6}
                  onClick={() => applyForAd()}
                  isLoading={localLoading}
                >
                  Apply
                </Button>
              </Box>
            </Center>
          </Box>
          <Box p={6} bg={bannerBg} mt={6} rounded={"lg"}>
            <Heading size="md">Applied Ads:</Heading>
            <VStack>
              {appliedAds.length > 0 ? (
                appliedAds.map((ad, i) => (
                  <Flex
                    width={"60%"}
                    mt={6}
                    bg={formColor}
                    rounded="lg"
                    p={6}
                    key={i}
                    justifyContent={"space-between"}
                  >
                    <VStack alignItems={"flex-start"}>
                      <Text>Ad Label: {ad.adLabel}</Text>
                      <Text>Approved: {ad.isApproved ? "Yes" : "No"}</Text>
                      <Text>Paid: {ad.isPaid ? "Yes" : "No"}</Text>
                      <Text>
                        Plan: {ad.adPlanId.name}, Rs{ad.adPlanId.price},{" "}
                        {ad.adPlanId.durationDays} day
                      </Text>
                      <Button
                        isDisabled={
                          (ad.isApproved && ad.isPaid) ||
                          (!ad.isApproved && !ad.isPaid)
                        }
                        size="sm"
                        onClick={() =>
                          handleRazorPay(ad.adPlanId.price, ad._id)
                        }
                      >
                        Pay
                      </Button>
                    </VStack>
                    <VStack alignItems={"center"}>
                      <Image src={ad.adURL} width={200} />
                    </VStack>
                  </Flex>
                ))
              ) : (
                <Text>No Ads found.</Text>
              )}
            </VStack>
          </Box>
        </>
      )}
      <Footer />
    </Box>
  );
};

export default AdRegistration;
