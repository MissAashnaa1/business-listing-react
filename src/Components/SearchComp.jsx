import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputAddon,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

const SearchComp = () => {
  return (
    <Box>
      <Box
        mt={4}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormControl>
          <FormLabel>
            <span style={{ fontWeight: 900, fontSize: "32px" }}>
              Search across{" "}
            </span>
            <span style={{ fontSize: "28px" }}>
              '3 Crore+'{" "}
              <span style={{ color: "skyblue", fontWeight: 900 }}>
                Businesses
              </span>
            </span>
          </FormLabel>
          <InputGroup
            width={"70%"}
            gap={3}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Input width={{ base: "60%", md: "40%" }} />
            <Input />
            <InputAddon
              as={Button}
              width={{ base: "fit-content" }}
              alignSelf={"flex-end"}
            >
              Search
            </InputAddon>
          </InputGroup>
        </FormControl>

        <Box display={{ base: "none", md: "block" }}>
          <Button variant={"outline"}>Download App</Button>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default SearchComp;
