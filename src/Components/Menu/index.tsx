import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { VStack, Button, Flex, Text } from '@chakra-ui/react';
import { IoMdHome, IoMdSettings, IoMdPerson, IoMdChatbubbles, IoMdNotifications } from 'react-icons/io';

export const MobileNav = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const buttonData = [
    { icon: <IoMdHome />, text: 'Home' },
    { icon: <IoMdSettings />, text: 'Settings' },
    { icon: <IoMdPerson />, text: 'Profile' },
    { icon: <IoMdChatbubbles />, text: 'Chat' },
    { icon: <IoMdNotifications />, text: 'Notifications' },
  ];

  return (
    isMobile && (
      <Flex
        // Ajuste a direção com base no tamanho da tela
        borderRadius={'25px 25px 0 0'}
        display={isMobile ? 'flex' : 'none'}
        direction={'row'}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        p="4"
        bg={'white'}
        justify="space-around"
        align="center"
      >
        {buttonData.map(({ icon, text }, index) => (
          <Button fontSize={'25px'} key={index} variant="ghost" display={'flex'} flexDirection={'column'}>
            {icon}
          </Button>
        ))}
      </Flex>
    )
  )
};