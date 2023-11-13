import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../constants";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "../redux/features/counter";
import ReactGA from "react-ga";

const LoginModal = ({ children }) => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        toast("Please fill all the fields");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("Loggin successfully");
      dispatch(
        setUser({
          username: username,
        })
      );
      dispatch(setIsAuthenticated(true));
      setPassword("");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    onOpen();
    ReactGA.event({
      category: "Login",
      action: "Login clicked",

      label: "test lablel login btn",
    });
  };

  return (
    <div>
      <span
        onClick={() => {
          handleLoginClick();
        }}
      >
        {children}
      </span>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in to your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>password</FormLabel>
              <Input
                type={"password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              colorScheme="blue"
              mr={3}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
