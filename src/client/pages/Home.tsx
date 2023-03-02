import {
  Stack,
  HStack,
  VStack,
  Box,
  Text,
  Link,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  HomeIcon,
  BellIcon,
  AccountIcon,
  LogOutIcon,
} from '../components/icons';
import { useGetUser } from '../query/queryHooks/getUser';
import Bear from '../assets/img/bear.png';
import EditImg from '../assets/img/edit.png';
import PassImg from '../assets/img/pass.png';
type Props = {};

const Home = (props: Props) => {
  let { identifier } = useParams();
  const { data: user } = useGetUser(identifier);

  return (
    <Box>
      <Box minH="100vh" bg="#E2E2E2">
        <Box as="nav">
          <Stack
            direction="row"
            justify="space-between"
            p="24px 24px 20px 80px"
            bg="white"
          >
            <Box>
              <Text
                className="oswald"
                fontWeight="400"
                fontSize="30px"
                lineHeight="44px"
              >
                Logo
              </Text>
            </Box>
            <HStack gap="96px">
              <Link href="/">
                <HomeIcon />
              </Link>
              <BellIcon />
              <Stack direction="row" alignItems="center" gap="5">
                <Text
                  className="PortLligatSans"
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight="21px"
                >
                  {user?.user?.otherData?.name}
                </Text>
                <AccountIcon />
              </Stack>
              <Link href="/">
                <LogOutIcon />
              </Link>
            </HStack>
          </Stack>
        </Box>
        <HStack mt="97px" pb="50px" gap="72px">
          <VStack
            w="315px"
            h="385px"
            bg="rgba(255, 255, 255, 0.9)"
            pt="53px"
            pb="96px"
            ml="56px"
          >
            <Image src={Bear} alt="profile" />
            <Text
              mt="13px"
              className="PortLligatSans"
              fontWeight="400"
              fontSize="30px"
              lineHeight="32px"
            >
              {user?.user?.otherData?.name ?? 'GPT Whale'}
            </Text>
            <HStack mt="25px !important">
              <Text
                className="PortLligatSans"
                fontWeight="400"
                fontSize="24px"
                lineHeight="26px"
              >
                Edit Profile
              </Text>
              <Image src={EditImg} alt="edit" />
            </HStack>
            <HStack mt="26px !important">
              <Text
                className="PortLligatSans"
                fontWeight="400"
                fontSize="24px"
                lineHeight="26px"
              >
                Edit Password
              </Text>
              <Image src={PassImg} alt="pass" />
            </HStack>
          </VStack>
          <Box bg="white" w="100%" maxW="800px">
            <Text
              p="19px 10px 69px 98px"
              className="PortLligatSans"
              fontWeight="400"
              fontSize="40px"
              lineHeight="43px"
            >
              Profile
            </Text>
            <Box>
              {profileField('Name', user?.user?.otherData?.name)}
              {profileField('Username', `@${user?.user?.otherData?.username}`)}
              {profileField('Interest', user?.user?.otherData?.interest)}
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

function profileField(label: string, value: string) {
  return (
    <VStack gap="10px" alignItems="flex-start" px="40px" pb="42px">
      <Text
        className="PortLligatSans"
        fontWeight="400"
        fontSize="24px"
        lineHeight="26px"
      >
        {label}
      </Text>
      <Text
        pl="14px"
        w="100%"
        h="30px"
        bg="rgba(217, 217, 217, 0.5)"
        display="flex"
        alignItems="flex-end"
        className="PortLligatSans"
        fontWeight="400"
        fontSize="24px"
        lineHeight="26px"
        opacity="0.7"
      >
        {value}
      </Text>
    </VStack>
  );
}

export default Home;
