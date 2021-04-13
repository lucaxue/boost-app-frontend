import React from "react";

import NavLink from "../NavLink";
import { Flex } from "@chakra-ui/react";
import { Box } from "@material-ui/core";

function NavBar() {
  return (
    <Flex
      position="fixed"
      bottom={[0, 0, 0, null]}
      top={[null, null, null, 0]}
      textColor="white"
      flexDirection={["row", "row", "row", "column"]}
      justifyContent={[
        "space-between",
        "space-between",
        "space-between",
        "left",
      ]}
      w={["100%", "100%", "100%", "10%"]}
      h={["max-content", "max-content", "max-content", "100vh"]}
      bg="#1AC0C6"
    >
      <NavLink to="/">
        <Box display={[null, "none", "none", "none"]}>
          <span className="material-icons">account_circle</span>
        </Box>
        <Box display={["none", "inline"]}>Profile</Box>
      </NavLink>

      <NavLink to="/CreateEvent">
        <Box display={[null, "none", "none", "none"]}>
          <span className="material-icons">add_circle_outline</span>
        </Box>
        <Box display={["none", "inline"]}>Create Event</Box>
      </NavLink>

      <NavLink to="/GroupFeed">
        <Box display={[null, "none", "none", "none"]}>
          <span className="material-icons">group</span>
        </Box>
        <Box display={["none", "inline"]}>Group Feed</Box>
      </NavLink>
    </Flex>
  );
}

export default NavBar;
