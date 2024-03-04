import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Work } from '../../../Types'
import { CardWork } from '../../CardWork'
import { UserContext } from '../../../Contexts/UserContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaWork } from './schema'

export const ListWork = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [works, setWorks] = useState<Work[]>([])

  const { user, handleCreateWork } = useContext(UserContext)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaWork)
  });

  const onSubmit = async (data: Work) => {
    try {
      await handleCreateWork(data);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding technology:", error);
    }
  }

  useEffect(() => {
    if (user.works) {
      setWorks(user.works);
    }
  }, [user.works]);

  return (
    <>
      <Flex w={'100%'} direction={'column'} bg={'white'} borderRadius={10}>
        <Flex w={'100%'} padding={['15px 25px', '30px']} boxShadow={"1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15)"} alignItems={'center'} justifyContent={'space-between'}>
          <Text color={'#00baff'}>Trabalhos</Text>
          <Button bg={'#212529'} color={'#00baff'} onClick={() => setIsModalOpen(true)} transition="background 0.3s ease-out" _hover={{ bg: '#3E454D', color: 'white' }}>+</Button>
        </Flex>
        <Flex h={'300px'} direction={'column'} gap={2} overflow={'auto'} p={'0 5px'} bg={'white'} padding={['10px', '30px']}>
          {works.length > 0 ? (
            works.map((item: Work, index: number) => (
              <CardWork title={item.title} deploy_url={item.deploy_url} description={item.description} id={item.id} key={index} />
            ))
          ) : (
            <Text color={'white'}>Não há trabalhos registrados.</Text>
          )}
        </Flex>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Projeto</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Nome do Projeto</FormLabel>
                <Input {...register("title")} />
                <Text color="red.500">{errors.title?.message}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Descrição</FormLabel>
                <Textarea {...register("description")} />
                <Text color="red.500">{errors.description?.message}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>URL de Deploy</FormLabel>
                <Input {...register("deploy_url")} />
                <Text color="red.500">{errors.deploy_url?.message}</Text>
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
