import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Link,
  Image,
  Flex,
  // HStack,
  // Grid,
} from "@chakra-ui/react";
import LogoutButton from "Components/LogoutButton";

function ProfileCard({
  firstName,
  surname,
  picture,
  username,
  group,
  //hours,
  isAdmin,
}) {
  return (
    <Center py={6}>
      <Box
        bg="white"
        minW={["275px", "445px"]}
        maxW="445px"
        w="full"
        border="0.3px solid lightgrey"
        boxShadow="xl"
        rounded="md"
        overflow="hidden"
        mx={1}
      >
        <Image
          h="200px"
          w="full"
          src="https://images.unsplash.com/photo-1496163668521-39614a16b23f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
          objectFit="cover"
          
        />

        <Flex justify={"center"} mt={-12}>
          <Avatar
            data-testid="image"
            border="2px solid white"
            size="xl"
            src={picture}
            alt={firstName}
            mb={4}
            pos="relative"
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
        </Flex>
        <Heading data-testid="fullname" fontSize="2xl" textAlign="center">
          {`${firstName} ${surname}`}
        </Heading>
        <Text textAlign="center" fontWeight={600} color="gray.500" mb={4}>
          @{username}
        </Text>
        <Text textAlign="center" color="gray.700" px={3}>
          <Heading
            data-testid="ProfileCardAdminHeading"
            size="xs"
            color="gray.400"
          >
            {isAdmin ? "ADMIN OF" : "PART OF"}
          </Heading>

          <Text data-testid="groupName" color="#1ac0c6">
            #{group}
          </Text>
        </Text>

        {/* <Grid placeItems="center" pt={8}>
          <HStack>
            <Text className="material-icons" color="gray.500" fontSize="2xl">
              schedule
            </Text>
            <Heading size="xl" color="gray.500" fontSize="2xl">
              {hours + ' HOURS'}
            </Heading>
          </HStack>
        </Grid> */}

        <Box p={10} textAlign="right">
          <LogoutButton size="sm" bg="#facd60" />
        </Box>
      </Box>
    </Center>
  );
}

export default ProfileCard;
