import { Flex, Text } from '@chakra-ui/react'
import { Tech } from '../../Types'

export const CardTech = (item: Tech) => {
  return (
    <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'} bg={'#121214'} p={'20px'} borderRadius={'10px'}>
      <Text fontSize={'18px'} color={'white'} >{item.title}</Text>
      <Text fontSize={'18px'} fontWeight={300} color={'#868E96'} >{item.status}</Text>
    </Flex>
  )
}
