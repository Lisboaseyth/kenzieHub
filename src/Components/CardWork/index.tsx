import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import { Work, WorkUpdate } from '../../Types'
import { useContext, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaWork } from '../Lists/ListWork/schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiEdit } from 'react-icons/fi'
import { LuTrash2 } from 'react-icons/lu'

export const CardWork = ({title, description, deploy_url, id}: Work) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { handleUpdateWork, handleDeleteWork } = useContext(UserContext)

  const { handleSubmit, register, formState: { errors, isDirty }, reset } = useForm({
    resolver: yupResolver(schemaWork),
    defaultValues: {
      title: title,
      description: description,
      deploy_url: deploy_url
    }
  });

  const onSubmit: SubmitHandler<WorkUpdate> = (data) => {
    id && handleUpdateWork(data, id);
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex w={'100%'} direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} bg={'white'} p={'20px'} borderRadius={'5px'} boxShadow="0 19px 50px 27px rgba(0, 0, 0, 0.07)" gap={5}>
        <Flex direction={['column', 'row']} justifyContent={['flex-start', 'space-between']} w={'100%'}>
          <Text fontSize={'25px'} color={'#0075FF'} >{title}</Text>
          <Flex>
            <Button as={'div'} cursor={'pointer'} bg={'none'} fontSize={20} onClick={() => setIsModalOpen(true)}><FiEdit /></Button>
            <Button as={'div'} cursor={'pointer'} bg={'none'} fontSize={20} onClick={() => id && handleDeleteWork(id)}><LuTrash2 /></Button>
          </Flex>
        </Flex>
        <Text fontSize={'16px'} fontWeight={300} color={'#9C9C9C'} >{deploy_url}</Text>
        <Text fontSize={'16px'} fontWeight={300} color={'#0075FF'} >{description}</Text>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Projeto</ModalHeader>
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
                <Button colorScheme="blue" mr={3} type="submit" isDisabled={!isDirty}>
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
