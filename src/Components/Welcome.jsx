import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Welcome = () => {
  const data = [
    {
      heading: "All India",
      text: "Elevate your search for B2B requisites. From lead generation to promoting and selling products/services, enables enterprises to reach vast audiences all across India. Embracing digital strategies,  offering convenience in the B2B market space and empowering businesses nationwide.",
    },
    {
      heading: "Packers & Movers",
      text: "If you’re relocating to another place, or even if you just want to send some belongings elsewhere, find the best deals on the most reliable packers and movers for your location. Get quotes from multiple agencies, read reviews from previous customers, and check ratings before making a selection for a hassle-free experience.",
    },
    {
      heading: "Order Food Online",
      text: "You are just three clicks away from placing an order and exploring a wide range of exotic cuisines. Order food online with Justdial and get your favourite food delivered at your doorstep. Search for restaurants, view reviews and ratings, avail discounts and order your food.",
    },

    {
      heading: "Jobs",
      text: "Providing pertinent jobs to job seekers and relevant profiles to employers, this service will help you reach out to employers and vice-versa across industry verticals, experience levels and geographies.",
    },
    {
      heading: "Movies",
      text: "This gives you access to book tickets and keep updated with the latest movies. With the provision of a synopsis, cast, crew and trailer, you can make a better choice in the movie you would like to watch.",
    },
    {
      heading: "Travel",
      text: "This service facilitates you to book domestic and international flights on platform. You can also book hotels and holiday packages through this section.",
    },
    {
      heading: "SPA & Salon",
      text: "Skip the wait to get pampered at a spa or a salon. In a few clicks, 'Book an Appointment' online through Justdial before your next visit.",
    },
    {
      heading: "Repain & Services",
      text: "Skip the wait to get pampered at a spa or a salon. In a few clicks, 'Book an Appointment' online through Justdial before your next visit.",
    },
    {
      heading: "Doctor Appointment",
      text: "Find the suitable medical specialist to take care of your health and well-being. Healthcare made easy.",
    },
    {
      heading: "Real Estate & Property",
      text: "Discover the power of our cohesive platform for simplified property searches. Whether your interest lies in PG, rentals, buying, or selling, you can connect with trusted agents and developers and stay updated on upcoming or trending residential and commercial projects.",
    },
    {
      heading: "Online Recharge/Bill Payment",
      text: "With the help of this service you can stay on track in making your bill payments and recharges without having to wait in a queue. This includes bill payments for gas, electricity, data card, DTH, landline, etc.",
    },
  ];

  return (
    <Box
      mt={14}
      px={{ base: 2, sm: 3, md: 6, lg: 12 }}
      display={{ base: "none", sm: "block" }}
      flexDirection={{ base: "column" }}
      // alignItems={"center"}
      // justifyContent={"space-between"}
    >
      <VStack mb={12}>
        <Text mb={3}>
          Welcome to BusinessListing, your 'one stop shop' where you are
          assisted with day-to-day and exclusive planning and purchasing
          activities. We take pride in our iconic customer support number,
          8888888888 and the fact that we own a strong hold on local business
          information pan India.
        </Text>

        <Text mb={3}>
          Our service extends from providing address and contact details of
          business establishments around the country, to making orders and
          reservations for leisure, medical, financial, travel and domestic
          purposes. We enlist business information across varied sectors like
          Hotels, Restaurants, Auto Care, Home Decor, Personal and Pet Care,
          Fitness, Insurance, Real Estate, Sports, Schools, etc. from all over
          the country. Holding information right from major cities like Mumbai,
          Delhi, Bangalore, Hyderabad, Chennai, Ahmedabad and Pune our reach
          stretches out to other smaller cities across the country too.
        </Text>
        <Text>
          Our 'Free Listing' feature gives a platform to showcase varied
          specialities. We then furnish you with the information via phone, SMS,
          web, App and WAP as well as, create a space for you to share your
          experiences through our 'Rate & Review' feature. Through the 'Best
          Deals', 'Last Minute Deals' and 'Live Quotes', we make sure that you
          are offered the best bargains in the market.
        </Text>
      </VStack>
      <Text as={"h2"} fontWeight={700} fontSize={"2xl"}>
        Some of our services that will prove useful to you on a day-to-day basis
        are :
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10} mt={10}>
        {data.map((item, i) => (
          <Card key={i}>
            <CardBody>
              <Heading as={"h3"} fontSize={"xl"}>
                {item.heading}
              </Heading>
              <Text>{item.text}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Text my={3}>
        Some of the other services that can be of assistance to you for leisure,
        health and home convenience are - Pest Control, Skin Care Clinics,
        Painters, Laundry Services, Interior Designers, Mobile Phone Repair,
        Vaccination Centres, Internet Service Providers, etc. With an endless
        number of things under the sun, you can be sure this will be your 'One
        Stop Shop' to find everything and more.
      </Text>
    </Box>
  );
};

export default Welcome;
