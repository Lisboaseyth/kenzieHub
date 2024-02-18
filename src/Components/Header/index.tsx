import { Button, Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'

export const HeaderComponent = () => {

  const { logoutUser } = useContext(AuthContext)

  return (
    <Flex w={'100%'} justify="space-between" alignItems={'center'} p={['20px 10px', '20px 10%']} borderBottom={'1px solid white'} >
      <Text fontSize={'1.5rem'} color={'white'}>Kenzie Hub</Text>
      <Button onClick={() => logoutUser()} bg={'#212529'} color={'white'} transition="background 0.3s ease-out" _hover={{ bg: '#3E454D', color: 'white' }}>Sair</Button>
      {/* <IconButton
        mr={2}
        bg={'none'}
        color={'grey'}
        icon={<Image src={Brasil} w={'30px'} />}
        aria-label={t('portuguese')}
        onClick={() => changeLanguage('pt')}
      />
      <IconButton
        mr={2}
        bg={'none'}
        color={'grey'}
        icon={<Image src={Usa} w={'30px'} />}
        aria-label={t('english')}
        onClick={() => changeLanguage('en')}
      /> */}
    </Flex>
  )
}