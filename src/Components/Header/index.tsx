import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Cloud from '../../assets/borderNuvensShadow.png'
export const HeaderComponent = () => {

  const { logoutUser } = useContext(AuthContext)

  return (
    <>
      <Flex w={'100%'} bg={'white'} justify="space-between" alignItems={'center'} p={['20px 10px', '20px 10%']} borderBottom={'1px solid white'} boxShadow={"0 19px 50px 27px rgba(0, 0, 0, 0.25)"} >
        <Text fontSize={'1.5rem'} color={'#00a2ff'}>Kenzie Hub</Text>
        <Button onClick={() => logoutUser()} bg={'#212529'} color={'white'} transition="background 0.3s ease-out" _hover={{ bg: '#3E454D', color: 'white' }}>Sair</Button>
      </Flex>
      <Image src={Cloud} position={'relative'} w={'100%'} h={'auto'} />
    </>
  )
}