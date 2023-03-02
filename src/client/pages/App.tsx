import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import bg from '../assets/img/bg2.png';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  useDisclosure,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';

import styles from '../styles/Home.module.css';
import { useNavigate } from 'react-router-dom';
import {
  Flash,
  Scope,
  FlashWhite,
  Logo,
  PolygonLogo,
  GoogleIcon,
  BlindIcon,
} from '../components/icons';
import { useGetSignInAuthReq } from '../query/queryHooks/getAuthReq';

function App() {
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const { data: authReq, isSuccess } = useGetSignInAuthReq();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkVerificationStatus = async (sessionID: string) => {
    try {
      const resp = await axios.get(apiUrl + `status?sessionId=${sessionID}`);

      if (resp?.data.isAuth) {
        const { isAuth, identifier, onboard } = resp?.data;
        return { isAuth, identifier, onboard };
      } else {
        return { isAuth: false, identifier: null, onboard: null };
      }
    } catch (err) {
      // console.log('err->', err?.response?.data );
      return { isAuth: false, identifier: null, onboard: null };
    }
  };
  useEffect(() => {
    if (!isSuccess) return;
    (async () => {
      const intervalSig = setInterval(async () => {
        const { isAuth, identifier, onboard } = await checkVerificationStatus(
          authReq?.sessionId
        );

        if (isAuth) {
          setIsExploding(true);
          clearInterval(intervalSig);
          setTimeout(() => {
            if (onboard) {
              navigate(`/home/${identifier}`);
            } else {
              navigate(`/onboard/${identifier}`);
            }
          }, 2000);
        }
      }, 2000);
    })();
  }, [isSuccess]);

  // if (!isSuccess) return redirect('/onboard');
  return (
    <>
      <main>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="none" />
          <ModalContent
            bg="rgba(255, 242, 242, 0.13)"
            borderRadius="24px"
            backdropFilter="blur(10px)"
          >
            <ModalHeader>Scan the QR code bellow</ModalHeader>
            <ModalCloseButton />
            <ModalBody p="36px" display="flex" justifyContent="center">
              {isSuccess && (
                <div className={styles.border}>
                  <>
                    {isExploding && (
                      <ConfettiExplosion
                        particleCount={300}
                        duration={4000}
                        force={0.7}
                      />
                    )}
                  </>
                  <QRCode
                    level="Q"
                    // style={{ width: 256 }}
                    value={JSON.stringify(authReq?.request)}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box bg="#F0F2F5" minH="100vh">
          <Flex minH="100vh">
            {/* left section */}
            <Box flex="0.45" position="relative" zIndex="2">
              <Image
                src={bg}
                alt="Background"
                w="100%"
                h="100%"
                // objectFit="cover"
                objectPosition="center"
              />
              {/* floating widgets? */}
              <Box position="absolute" left="16%" top="237px">
                <Stack
                  direction="row"
                  bg="brand.green"
                  borderRadius="47.5px"
                  w="246px"
                  h="60px"
                  justifyContent="space-between"
                  alignItems="center"
                  pr="30px"
                  pl="9px"
                >
                  <Flash />
                  <Text fontSize="15.2px" fontWeight="500" lineHeight="19px">
                    Royal Stock Images
                  </Text>
                </Stack>
              </Box>

              {/* second widget? */}
              <Box
                position="absolute"
                left="16%"
                top="315px"
                w="246px"
                h="158.04px"
              >
                <VStack
                  gap="13.87px"
                  borderRadius="14.3169px"
                  bg="rgba(0, 0, 0, 0.14)"
                  backdropFilter="blur(21.4754px)"
                  p="17.89px 20.87px 25px 17.76px"
                  alignItems="flex-start"
                >
                  <Scope />
                  <Text
                    fontSize="18px"
                    fontWeight="400"
                    lineHeight="22px"
                    color="white"
                  >
                    Best Stock Photos and Videos from across the internet.
                  </Text>
                </VStack>
              </Box>

              {/* third widget? */}
              <Box position="absolute" right="-87px" bottom="399px">
                <Stack
                  direction="row"
                  bg="#5A5A5A"
                  borderRadius="49.6901px"
                  w="220.86px"
                  h="63px"
                  justifyContent="space-between"
                  alignItems="center"
                  pr="30px"
                  pl="9px"
                >
                  <FlashWhite />
                  <Text
                    fontSize="18.9449px"
                    fontWeight="400"
                    lineHeight="23px"
                    color="white"
                  >
                    Image Editor
                  </Text>
                </Stack>
              </Box>
              {/* fort widget */}
              <Box
                position="absolute"
                right="-95px"
                w="353px"
                h="353px"
                borderRadius="50%"
                bottom="11px"
                bg="rgba(32, 220, 73, 0.38)"
                filter="blur(100px)"
                zIndex="-1"
              />

              {/* fifth widget */}
              <Box
                position="absolute"
                right="14px"
                bottom="28px"
                w="547px"
                h="270px"
              >
                <VStack
                  bg="rgba(255, 242, 242, 0.13)"
                  gap="25px"
                  borderRadius="14.3169px"
                  backdropFilter="blur(21.4754px)"
                  p="42px 57px 59px 37px"
                  alignItems="flex-start"
                >
                  <Stack
                    align="center"
                    direction="row"
                    w="238px"
                    h="45px"
                    bg="brand.green"
                    borderRadius="10px"
                    p="14px 14px 14px 17px"
                  >
                    <Text fontSize="14px">👍</Text>
                    <Text fontSize="14px" fontWeight="400" lineHeight="17px">
                      Top Notch Stock Resources
                    </Text>
                  </Stack>
                  <Text
                    fontSize="20px"
                    fontWeight="400"
                    lineHeight="33px"
                    color="white"
                    maxW="453px"
                  >
                    Today, we create innovative solutions to the challenges that
                    consumers face in both their everyday lives and events.
                  </Text>
                </VStack>
              </Box>
            </Box>
            {/* right section */}
            <Box flex="0.55">
              <Box
                pt={10}
                px="54px"
                as="nav"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex align="center" gap="3" cursor="pointer">
                  <Logo />
                  <Heading as="h1">
                    <Text
                      fontWeight="500"
                      fontSize="17px"
                      lineHeight="41px"
                      className="inter"
                    >
                      Urek
                    </Text>
                  </Heading>
                </Flex>
                <Flex gap="10px" justifyContent="center" alignItems="center">
                  <Text fontWeight="300" fontSize="sm" lineHeight="14px">
                    Don’t have an account?
                  </Text>
                  <Text fontWeight="500" fontSize="sm" color="brand.green">
                    Sign up
                  </Text>
                </Flex>
              </Box>
              <VStack
                maxW="400px"
                m="0 auto"
                mt="94px"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <Heading
                    as="h1"
                    fontWeight="600"
                    fontSize="4xl"
                    textAlign="center"
                    lineHeight="44px"
                    pb="6px"
                  >
                    Welcome back
                  </Heading>
                  <Text
                    fontWeight="400"
                    fontSize="18px"
                    textAlign="center"
                    lineHeight="29px"
                    pb="37px"
                  >
                    Login into your account
                  </Text>
                </Box>
                {/* login with socials */}
                <Box>
                  <HStack gap="14px">
                    <Button
                      bg="white"
                      w="126px"
                      h="44px"
                      display="flex"
                      gap="8px"
                      onClick={onOpen}
                    >
                      <PolygonLogo />{' '}
                      <Text fontWeight="500" fontSize="xs" lineHeight="44px">
                        Polygon ID
                      </Text>
                    </Button>
                    <Button
                      bg="white"
                      w="126px"
                      h="44px"
                      display="flex"
                      gap="8px"
                    >
                      <GoogleIcon />{' '}
                      <Text fontWeight="500" fontSize="xs" lineHeight="44px">
                        Google
                      </Text>
                    </Button>
                  </HStack>
                </Box>
                <HStack
                  alignItems="center"
                  pt="37px"
                  pb="35px"
                  mt="0 !important"
                >
                  <Box
                    w="130px"
                    h="0"
                    border="1px"
                    borderColor="#DBDBDB"
                    borderStyle="solid"
                  />
                  <Text fontWeight="400" fontSize="13px" lineHeight="14px">
                    Or continue with
                  </Text>
                  <Box
                    w="130px"
                    h="0"
                    border="1px"
                    borderColor="#DBDBDB"
                    borderStyle="solid"
                  />
                </HStack>
                {/* inputs */}
                <VStack gap="38px" w="100%">
                  <Input
                    variant="outline"
                    placeholder="Email"
                    w="100%"
                    maxW="400px"
                    h="70px"
                    borderRadius="10px"
                    bg="white"
                    border="1px"
                    borderColor="#D9D9D9"
                    borderStyle="solid"
                  />
                  <InputGroup>
                    <Input
                      variant="outline"
                      placeholder="Password"
                      maxW="400px"
                      h="70px"
                      borderRadius="10px"
                      bg="white"
                      type="password"
                      border="1px"
                      borderColor="#D9D9D9"
                      borderStyle="solid"
                    />
                    <InputRightElement
                      // eslint-disable-next-line react/no-children-prop
                      children={<BlindIcon />}
                      display="flex"
                      alignItems="center"
                      h="100%"
                      cursor="pointer"
                    />
                  </InputGroup>
                </VStack>
                {/* remember section */}
                <HStack justify="space-between" w="100%" pt="21px" pb="35px">
                  <Stack direction="row">
                    <Switch id="remember-me" size="md" colorScheme="green" />
                    <Text
                      color="#1A1A1A"
                      letterSpacing="0.3px"
                      fontWeight="300"
                      fontSize="12px"
                      lineHeight="20px"
                    >
                      Remember me
                    </Text>
                  </Stack>
                  <Text
                    color="#D93F21"
                    fontWeight="300"
                    fontSize="14px"
                    lineHeight="14px"
                  >
                    Recover Password
                  </Text>
                </HStack>
                {/* Login button */}
                <Button
                  border="1px"
                  borderColor="#5A5A5A"
                  borderStyle="solid"
                  borderRadius="10px"
                  w="100%"
                  h="55px"
                >
                  <Text
                    color="#5A5A5A"
                    letterSpacing="0.3px"
                    fontWeight="400"
                    fontSize="18px"
                    lineHeight="14px"
                  >
                    Log in
                  </Text>{' '}
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </main>
    </>
  );
}

export default App;
