import { CloseIcon, InfoOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  BsPersonAdd,
  BsLightbulb,
  BsBriefcase,
  BsGraphUpArrow,
  BsPerson,
} from "react-icons/bs";
import { TbBrandNextcloud, TbCurrencyRupeeNepalese } from "react-icons/tb";
import {
  MdOutlineWorkspaces,
  MdBusiness,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { LiaLanguageSolid, LiaClipboardListSolid } from "react-icons/lia";
import { RiCustomerService2Line } from "react-icons/ri";
import { PiSpeakerHighLight } from "react-icons/pi";
import { BsBuildingGear } from "react-icons/bs";
import SigninModal from "../modals/SigninModal";
import toast from "react-hot-toast";
import LoginModal from "../modals/LoginModal";
import { useSelector } from "react-redux";

const Profile = ({ handleToggle }) => {
  const buttons = [
    { icon: LiaLanguageSolid, text: "English" },
    { icon: InfoOutlineIcon, text: "Customer Service" },
    { icon: BsGraphUpArrow, text: "List your Business" },
    { icon: PiSpeakerHighLight, text: "Advertise" },
    { icon: BsBuildingGear, text: "My Transactions" },
    { icon: TbCurrencyRupeeNepalese, text: "Manage Quotes" },
    { icon: LiaClipboardListSolid, text: "Wishlist" },
    { icon: BsBriefcase, text: "We are hiring" },
    { icon: MdOutlinePrivacyTip, text: "Privacy Policies" },
    { icon: SettingsIcon, text: "Settings" },
    { icon: MdBusiness, text: "Investor Relations" },
    { icon: BsLightbulb, text: "What's New" },
    { icon: TbBrandNextcloud, text: "Others" },
    // { icon: BsPersonAdd, text: "Login" },
  ];

  const { isAuthenticated, user } = useSelector((state) => state.counter);

  return (
    <Container p={4}>
      <Box>
        <CloseIcon onClick={() => handleToggle()} />
      </Box>
      <HStack justifyContent={"space-between"} my={3}>
        {isAuthenticated ? (
          <Text fontSize={"xl"}>Welcome, {user.username}</Text>
        ) : (
          <SigninModal>
            <Button variant={"ghost"} size="lg">
              Sign in
            </Button>
          </SigninModal>
        )}
        <Avatar mr={3} />
      </HStack>
      <HStack justifyContent={"space-between"} my={6} px={3}>
        <Button>Saved</Button>
        <Button>Reviews</Button>
        <Button>Favorites</Button>
      </HStack>

      <Stack gap={4} px={3}>
        {buttons.map(({ icon: Icon, text }, i) => (
          <Box key={i} as={Button} justifyContent="flex-start" variant="ghost">
            <HStack gap={4}>
              {Icon && <Icon />}
              <Text>{text}</Text>
            </HStack>
          </Box>
        ))}
        {isAuthenticated ? (
          <Button variant={"ghost"} size="lg" onClick={() => handleLogout()}>
            Logout
          </Button>
        ) : (
          <LoginModal>
            <Box as={Button} justifyContent={"flex-start"} variant={"ghost"}>
              <HStack gap={4}>
                <Icon as={BsPerson} /> <Text>Login</Text>
              </HStack>
            </Box>
          </LoginModal>
        )}
      </Stack>
    </Container>
  );
};

export default Profile;
