import React, { useEffect } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import {
  BsBell,
  BsGraphUpArrow,
  BsPersonXFill,
  BsPersonFill,
} from "react-icons/bs";
import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import LoginModal from "../modals/LoginModal";
import SigninModal from "../modals/SigninModal";
import { useDispatch, useSelector } from "react-redux";
import ToggleColorMode from "./ToggleColorMode";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";
import axios from "axios";
import { setIsAuthenticated, setUser } from "../redux/features/counter";

const Header = ({ handleToggle }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.counter);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/user/get-my-profile`,
          {
            withCredentials: true,
          }
        );

        console.log(data, "< user data");
        dispatch(setUser(data.user));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        console.log(error, "< error in getting user profile");
      } finally {
      }
    })();
  }, []);

  return (
    <Box
      mt={3}
      mx={8}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Link to="/">
        <Text
          fontSize={["xl", "2xl", "3xl", "4xl"]}
          fontFamily={"work sans"}
          fontWeight={"bold"}
        >
          Business<span style={{ color: "#7E191B" }}>Listing</span>
        </Text>
      </Link>
      <Box
        display={{ base: "none", sm: "none", md: "flex" }}
        flexDir={"row"}
        alignItems={"center"}
        size="sm"
      >
        <Link to="/ad-reg">
          <Button
            variant={"ghost"}
            leftIcon={<HiSpeakerphone />}
            size={{ base: "sm", md: "md" }}
            pl={"1"}
          >
            Advertise
          </Button>
        </Link>
        <Link to="/join-us">
          <Button
            variant={"ghost"}
            leftIcon={<HiSpeakerphone />}
            size={{ base: "sm", md: "md" }}
            pl={"1"}
          >
            Join Us
          </Button>
        </Link>
        <Link href="#">
          <Button
            variant={"ghost"}
            size={{ base: "sm", md: "md" }}
            leftIcon={<BsGraphUpArrow />}
            px={"1"}
          >
            Listing
          </Button>
        </Link>

        <ButtonGroup>
          <ToggleColorMode size={{ base: "sm", md: "md" }} />

          {isAuthenticated ? (
            <>
              <Button
                variant={"ghost"}
                size={{ base: "sm", md: "md" }}
                px={"1"}
              >
                <BsBell />
              </Button>
              <Text>{user ? user.username : "-"}</Text>
            </>
          ) : (
            <>
              <LoginModal>
                <Button
                  variant={"solid"}
                  size={{ base: "sm", md: "md" }}
                  px={"1"}
                >
                  Login
                </Button>
              </LoginModal>
              <SigninModal>
                <Button
                  variant={"solid"}
                  size={{ base: "sm", md: "md" }}
                  px={"1"}
                >
                  Signup
                </Button>
              </SigninModal>
            </>
          )}
        </ButtonGroup>
      </Box>

      <Box display={{ base: "block", md: "none" }}>
        <Button
          rounded={"full"}
          bg="transparent"
          onClick={() => handleToggle()}
        >
          <Icon as={BsPersonFill} />
        </Button>
        <Menu>
          <MenuButton as={Button} variant={"unstyled"}>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="#" icon={<HiSpeakerphone />}>
              Advertise
            </MenuItem>
            <MenuItem as={Link} href="#" icon={<BsGraphUpArrow />}>
              Free Listing
            </MenuItem>
            <MenuItem as={Button}>Login / Sign up</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
