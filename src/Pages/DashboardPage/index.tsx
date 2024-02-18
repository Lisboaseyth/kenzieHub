import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from "@chakra-ui/react"
import { HeaderComponent } from "../../Components/Header"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaTech } from "./schema"
import { Tech } from "../../Types"
import { CardTech } from "../../Components/CardTech"
import { MobileNav } from "../../Components/Menu"

export const DashboardPage = () => {

  const { user, handleGetUser, handleCreateTech } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [techs, setTechs] = useState<Tech[]>([])

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaTech)
  });

  useEffect(() => {
    handleGetUser()
  }, []);

  useEffect(() => {
    if (user.techs) {
      setTechs(user.techs); // Update the techs state when user techs change
    }
  }, [user.techs]);

  const onSubmit = async (data: Tech) => {
    try {
      await handleCreateTech(data);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding technology:", error);
    }
  }

  return (
    <>
      <HeaderComponent />
      <Flex w={'100%'} direction={'column'} alignItems={'center'} p={['10px', '10px 10%']}>
        <Flex w={'100%'} alignItems={['flex-start', 'center']} justifyContent={['space-between']} direction={['column', 'row']}>
          <Text fontSize={'22px'} fontWeight={700} color={'white'}>{user.name}</Text>
          <Text fontSize={'18px'} fontWeight={300} color={'#868E96'}>{user.course_module}</Text>
        </Flex>
        <Flex w={'100%'} direction={'column'}>
          <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'} h={'100px'}>
            <Text color={'white'}>Tecnologias</Text>
            <Button bg={'#212529'} color={'white'} onClick={() => setIsModalOpen(true)} transition="background 0.3s ease-out" _hover={{ bg: '#3E454D', color: 'white' }}>+</Button>
          </Flex>
          <Flex h={'630px'} direction={'column'} gap={2} overflow={'auto'} p={'0 5px'} bg={'#868E96'} padding={['10px', '30px']}>
            {techs.length > 0 ? (
              techs.map((item: Tech, index: number) => (
                <CardTech title={item.title} status={item.status} key={index} />
              ))
            ) : (
              <Text color={'white'}>Não há tecnologias cadastradas.</Text>
            )}
          </Flex>
        </Flex>
        <MobileNav />
      </Flex>

      {/* Modal para adicionar tecnologia */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Tecnologia</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Nome da Tecnologia</FormLabel>
                <Input {...register("title")} />
                <Text color="red.500">{errors.title?.message}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nível</FormLabel>
                <Select {...register("status")}>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </Select>
                <Text color="red.500">{errors.status?.message}</Text>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Adicionar
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
