import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Router, useRouter } from 'next/router';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box pt='1rem' px={4}>
        <Flex
          mx='auto'
          maxW='4xl'
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            fontFamily={'Space Mono'}
            as='button'
            fontSize={'2xl'}
            fontWeight='bold'
            onClick={() => router.push('/')}
          >
            Florks
          </Box>
          <Flex alignItems={'center'}>
            <WalletMultiButton />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
