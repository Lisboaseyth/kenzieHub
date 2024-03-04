import { Flex, Text } from "@chakra-ui/react"
import { HeaderComponent } from "../../Components/Header"
import { useContext, useEffect } from "react"
import { MobileNav } from "../../Components/Menu"
import { ListTech } from "../../Components/Lists/ListTech"
import { ListWork } from "../../Components/Lists/ListWork"
import { UserContext } from "../../Contexts/UserContext"

export const DashboardPage = () => {

  const { user, handleGetUser } = useContext(UserContext)

  useEffect(() => {
    handleGetUser()
  }, []);



  return (
    <>
      <HeaderComponent />
      <Flex w={'100%'} direction={'column'} alignItems={'center'} p={['10px', '10px 10%']} gap={5}>
        <Flex w={'100%'} bg={'white'} padding={['15px 25px', '30px']} borderRadius={10} alignItems={['flex-start', 'center']} justifyContent={['space-between']} direction={['column', 'row']}>
          <Text fontSize={'22px'} fontWeight={700} color={'#00baff'}>{user.name}</Text>
          <Text fontSize={'18px'} fontWeight={300} color={'#00baff'}>{user.course_module}</Text>
        </Flex>
        <Flex direction={['column', 'column', 'column', 'row']} w={'100%'} justifyContent={'space-between'} gap={10}>
          <ListTech />
          <ListWork />
        </Flex>
        <MobileNav />
      </Flex >
    </>
  )
}
