import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function SplitScreen() {
  return (
    <Stack
      h={'40rem'}
      justify='center'
      alignItems={'center'}
      direction={{ base: 'column', md: 'row' }} 
      maxW='6xl'
      mx={'auto'}
      gap='4rem'
    >
      <Flex maxW={'26rem'} w='fit-content'   p={4}  align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }} fontWeight='bold'>
           Florks NFT Project
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'xl' }} color={'black'} fontWeight='medium'>
            Mint Florks into your crypto wallet.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button >Mint Florks</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex   w='fit-content' height='16rem' >
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://i.pinimg.com/564x/e0/0b/1a/e00b1a6efbd46632a205cdd83580d60e.jpg'
          }
        />
      </Flex>
    </Stack>
  );
}
