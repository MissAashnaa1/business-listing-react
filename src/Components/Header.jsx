import React from "react";
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
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import LoginModal from "../modals/LoginModal";
import SigninModal from "../modals/SigninModal";
import { useSelector } from "react-redux";
import ToggleColorMode from "./ToggleColorMode";

const Header = ({ handleToggle }) => {
  const { isAuthenticated, user } = useSelector((state) => state.counter);

  return (
    <Box
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
      >
        <Link href="#">
          <Button variant={"ghost"} size="sm" px={"1"}>
            We are Hiring
          </Button>
        </Link>
        <Link href="#">
          <Button variant={"ghost"} size="sm" fontFamily={"work sans"} px={"1"}>
            Investor Relations
          </Button>
        </Link>
        <Link href="#">
          <Button
            variant={"ghost"}
            leftIcon={<HiSpeakerphone />}
            size="sm"
            px={"1"}
          >
            Advertise
          </Button>
        </Link>
        <Link href="#">
          <Button
            variant={"ghost"}
            size="sm"
            leftIcon={<BsGraphUpArrow />}
            px={"1"}
          >
            Free Listing
          </Button>
        </Link>

        <ButtonGroup>
          <Button variant={"ghost"} size="sm" px={"1"}>
            <BsBell />
          </Button>
          <ToggleColorMode />

          {isAuthenticated ? (
            <Text>{user.username}</Text>
          ) : (
            <>
              <LoginModal>
                <Button variant={"solid"} size="sm" px={"1"}>
                  Login
                </Button>
              </LoginModal>
              <SigninModal>
                <Button variant={"solid"} size="sm" px={"1"}>
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
            <MenuItem as={Link} href="#">
              We are Hiring
            </MenuItem>
            <MenuItem as={Link} href="#">
              Investor Relations
            </MenuItem>
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
