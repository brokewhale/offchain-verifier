import {
  useToast,
  Flex,
  Heading,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Stack,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Logo } from '../components/icons';
import api from '../utils/axiosInstance';
import { Link as ReactLink } from 'react-router-dom';
import Bg from '../assets/img/bg1.png';
type Props = {};

const Onboard = (props: Props) => {
  let { identifier } = useParams();
  const navigate = useNavigate();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* A react-query hook that is used to make a post request to the server. */
  const mutation = useMutation(
    (data) =>
      api.post(`updateUser?identifier=${identifier}`, data, {
        headers: {
          accept: '*/*',
        },
      }),
    {
      onSuccess: (data) => {
        toast({
          title: 'Account update.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });

        setTimeout(() => {
          navigate(`/home/${identifier}`);
        }, 2000);
      },
    }
  );
  const onSubmit = (data: any) => {
    console.log(data);

    mutation.mutate(data);
  };

  return (
    <>
      <main>
        <Box bg="#F0F2F5" minH="100vh">
          <Flex minH="100vh">
            {/* left section */}
            <Box flex="0.55" pb="50px">
              <Box
                pt={10}
                px="54px"
                as="nav"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ReactLink to="/">
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
                </ReactLink>
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
                    fontSize="24px"
                    textAlign="center"
                    lineHeight="44px"
                    pb="6px"
                  >
                    Get Started With MAKER
                  </Heading>
                  <Text
                    fontWeight="400"
                    fontSize="18px"
                    textAlign="center"
                    lineHeight="29px"
                    pb="37px"
                  >
                    Getting started is easy
                  </Text>
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
                    Add your details
                  </Text>
                  <Box
                    w="130px"
                    h="0"
                    border="1px"
                    borderColor="#DBDBDB"
                    borderStyle="solid"
                  />
                </HStack>
                <form
                  style={{
                    width: '100%',
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* inputs */}
                  <VStack gap="20px" w="100%">
                    <Input
                      variant="outline"
                      placeholder="Full Name"
                      w="100%"
                      maxW="400px"
                      h="70px"
                      borderRadius="10px"
                      bg="white"
                      border="1px"
                      borderColor="#D9D9D9"
                      borderStyle="solid"
                      {...register('name')}
                    />
                    <Input
                      variant="outline"
                      placeholder="Username(whaleGPT)"
                      w="100%"
                      maxW="400px"
                      h="70px"
                      borderRadius="10px"
                      bg="white"
                      border="1px"
                      borderColor="#D9D9D9"
                      borderStyle="solid"
                      {...register('username')}
                    />

                    <Input
                      variant="outline"
                      placeholder="Interest(eg Music, Art, etc...)"
                      w="100%"
                      maxW="400px"
                      h="70px"
                      borderRadius="10px"
                      bg="white"
                      border="1px"
                      borderColor="#D9D9D9"
                      borderStyle="solid"
                      {...register('interest')}
                    />

                    <Textarea
                      placeholder="Intended use"
                      borderRadius="10px"
                      bg="white"
                      border="1px"
                      borderColor="#D9D9D9"
                      borderStyle="solid"
                      h="100px"
                      {...register('intendedUse')}
                    />
                  </VStack>

                  {/* Login button */}
                  <Button
                    mt="28px !important"
                    borderRadius="10px"
                    w="100%"
                    h="55px"
                    bg="brand.green"
                    type="submit"
                  >
                    <Text
                      letterSpacing="0.3px"
                      fontWeight="400"
                      fontSize="18px"
                      lineHeight="14px"
                    >
                      Update Account
                    </Text>{' '}
                  </Button>
                </form>
              </VStack>
            </Box>
            {/* right section */}
            <Box flex="0.45" position="relative" zIndex="2">
              <Image
                src={Bg}
                alt="Background"
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="center"
              />

              {/* fort widget */}
              <Box
                position="absolute"
                left="-102px"
                bottom="96px"
                w="353px"
                h="353px"
                borderRadius="50%"
                bg="rgba(32, 220, 73, 0.38)"
                filter="blur(100px)"
                zIndex="-1"
              />

              {/* fifth widget */}
              <Box
                position="absolute"
                left="37px"
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
          </Flex>
        </Box>
      </main>
    </>
  );
};

export default Onboard;
