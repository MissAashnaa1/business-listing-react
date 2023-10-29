import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";

const exploreJdCollection = [
  "Travel & Tourism",
  "Hotels",
  "Beauty & Fashion",
  "Health & Wellness",
  "Food & Bevarage",
  "Finance",
  "On Demand Services",
  "Home & Living",
  "Education",
  "Recreation",
];

const popularCategories = [
  "Body Massage Centres",
  "Beauty Parlours",
  "Cinema Halls",
  "Banks",
  "Restaurants",
  "Schools",
  "Beauty Spas",
  "Dematologists",
  "Hospitals",
  "Malls",
  "Gyms",
  "Beauty Parlours",
  "Estate Agents",
  "Banquet Halls",
  "Party Lawns",
  "ENT Doctors",
  "Book Shops",
  "Bike On Rent",
  "Sexologist Doctors",
  "Neurologists",
  "Gynaecologists",
  "Obstetricians",
  "Tiffin Services",
  "Travel Agents",
  "Paying Guests",
  "General Physician Doctors",
  "Dentists",
  "Orthopaedic Doctors",
  "Chemists",
  "Motor Training Schools",
  "Car Hire",
  "Car Repair & Services",
  "Gastroenterologists",
  "Ayurvedic Doctors",
  "Car Rental",
  "Salons",
  "Courier Services",
  "Diagnostic Centres",
  "Dance Classes",
  "Pathology Labs",
  "Home Tutors",
  "Taxi Services",
  "Cake Shope",
  "AC Repair & Services",
  "Mobile Phone Dealers",
  "Pet Shops",
  "Dmart",
  "Psychiatrists",
  "Dharamksalas",
  "Urologists Doctors",
  "Bakeries",
  "Bicycle Dealers",
  "Coffee Shops",
  "Paediastricians",
  "Sonography Centre",
  "Homeopathic Doctors",
  "Yoga Classes",
  "Hostels",
  "Cardiolists",
  "Electrical Shops",
  "Skin Care Clinics",
  "Diagnostic Centres",
  "Homeopathic Doctors",
  "Physiotherapists",
  "Photo Studios",
  "Plumbers",
  "Music Classes",
  "Sports Goods Dealers",
  "Shoe Dealers",
  "Hair Stylists",
  "Gift Shops",
  "Ophthalmologists",
  "Car Repain & Services",
  "Ayurvedic Doctors",
  "Eye Clinics",
  "Restaurants",
  "Carpenters",
  "Jewellery Showrooms",
  "Cooks On Hire",
  "Grocery Stores",
  "Beauty Parlours",
  "Drug de Addiction Centre",
  "Nephrologists",
  "Caterers",
  "Interior Designers",
  "Rehabilitation Centres",
];

const b2b = [
  "Agriculture",
  "Apparel & Garments",
  "Automobile",
  "Business Services",
  "Baby Care",
  "Beauty & Personal Care",
  "Book",
  "Chemicals",
  "Construction & Real Estate",
  "Electronic Component",
  "Electronics",
  "Energy",
  "Food",
  "Footwear",
  "Accessories",
  "Furniture",
  "Gifts & Crafts",
  "Health & Medical",
  "Home & Garden",
  "Industrial Machinery",
  "Jewellery",
  "Lightd & Lighting",
];

const popularCites = [
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Nagpur",
  "Surat",
  "Indore",
  "Goa",
  "Agra",
  "Coimbatore",
  "Kochi",
  "Patna",
  "Bhopal",
  "Vadodara",
  "Ludhiana",
  "Thiruvananthapuram",
  "Nashik",
  "Mysore",
  "Jodhpur",
  "Raipur",
  "Guwahati",
  "Mangalore",
  "Visakhapatnam",
  "Cuttack",
  "Siliguri",
  "Kanpur",
  "Dehradun",
  "Jamshedpur",
  "Allahabad",
  "Amritsar",
  "Bhubaneswar",
  "Bikaner",
  "Durgapur",
  "Gwalior",
  "Jabalpur",
  "Jalandhar",
  "Jammu",
  "Kolhapur",
  "Madurai",
  "Meerut",
  "Pondicherry",
  "Rajkot",
  "Ranchi",
  "Srinagar",
  "Tiruchirappalli",
  "Udaipur",
  "Varanasi",
  "Vijayawada",
  "Aurangabad",
  "Bareilly",
  "Dhanbad",
];

const AccordionComp = () => {
  return (
    <Box
      mt={12}
      px={{ base: 2, sm: 3, md: 6, lg: 12 }}
      display={{ base: "none", sm: "block" }}
      flexDirection={{ base: "column" }}
    >
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Explore JD Collections
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              {exploreJdCollection.map((item, index) => {
                return (
                  <Badge
                    as={Link}
                    href="#"
                    key={index}
                    px={2}
                    py={2}
                    m={1}
                    colorScheme="pink"
                  >
                    {" "}
                    {item}{" "}
                  </Badge>
                );
              })}
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Popular Categories
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              {popularCategories.map((item, index) => {
                return (
                  <Badge
                    as={Link}
                    href="#"
                    key={index}
                    px={2}
                    py={2}
                    m={1}
                    colorScheme="blue"
                  >
                    {" "}
                    {item}{" "}
                  </Badge>
                );
              })}
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                B2B
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              {b2b.map((item, index) => {
                return (
                  <Badge
                    as={Link}
                    href="#"
                    key={index}
                    px={2}
                    py={2}
                    m={1}
                    colorScheme="green"
                  >
                    {" "}
                    {item}{" "}
                  </Badge>
                );
              })}
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Popular Cities
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              {popularCites.map((item, index) => {
                return (
                  <Badge
                    as={Link}
                    href="#"
                    key={index}
                    px={2}
                    py={2}
                    m={1}
                    colorScheme="purple"
                  >
                    {" "}
                    {item}{" "}
                  </Badge>
                );
              })}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default AccordionComp;
