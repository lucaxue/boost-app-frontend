import React from "react";
import { Button } from "@chakra-ui/react";

const GenericButton = ({ text, handleClick, ...props }) => {
  return (
    <Button
      data-testid="generic button"
      bg="#1AC0C6"
      size="md"
      textColor="#fff"
      onClick={handleClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export default GenericButton;
