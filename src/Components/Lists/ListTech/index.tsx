import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react'
import { Tech } from '../../../Types'
import { CardTech } from '../../CardTech'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schemaTech } from './schema';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Contexts/UserContext';

export const ListTech = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [techs, setTechs] = useState<Tech[]>([])

  const { user, handleCreateTech } = useContext(UserContext)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaTech)
  });

  useEffect(() => {
    if (user.techs) {
      setTechs(user.techs);
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
      <Flex w={'100%'} direction={'column'} bg={'white'} borderRadius={10}>
        <Flex w={'100%'} padding={['15px 25px', '30px']} boxShadow={"1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15)"} alignItems={'center'} justifyContent={'space-between'}>
          <Text color={'#00baff'}>Tecnologias</Text>
          <Button bg={'#212529'} color={'#00baff'} onClick={() => setIsModalOpen(true)} transition="background 0.3s ease-out" _hover={{ bg: '#3E454D', color: 'white' }}>+</Button>
        </Flex>
        <Flex h={'630px'} direction={'column'} gap={2} overflow={'auto'} padding={['10px', '30px']}>
          {techs.length > 0 ? (
            techs.map((item: Tech, index: number) => (
              <CardTech title={item.title} status={item.status} id={item.id} key={index} />
            ))
          ) : (
            <Text color={'#00baff'}>Não há tecnologias cadastradas.</Text>
          )}
        </Flex>
      </Flex>
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
