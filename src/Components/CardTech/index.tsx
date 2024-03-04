import { Button, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Select, ModalFooter } from '@chakra-ui/react';
import { Tech } from '../../Types';
import { LuTrash2 } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaTech } from '../Lists/ListTech/schema';
import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';

export const CardTech = ({ title, status, id }: Tech) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { handleUpdateTech, handleDeleteTech } = useContext(UserContext)

  const { handleSubmit, register, formState: { errors, isDirty }, reset } = useForm({
    resolver: yupResolver(schemaTech),
    defaultValues: {
      title: title,
      status: status,
    }
  });

  const onSubmit: SubmitHandler<Tech> = (data) => {
    console.log(data, id);
    id && handleUpdateTech(data, id)
    reset();
    setIsModalOpen(false);
  };

  return (
    <Flex w={'100%'} direction={'column'} justifyContent={'space-between'} alignItems={'flex-start'} bg={'white'} p={'20px'} borderRadius={'5px'} boxShadow="0 19px 50px 27px rgba(0, 0, 0, 0.07)">
      <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize={'18px'} color={'#0075FF'} >{title}</Text>
        <Flex gap={[2, 5]}>
          <Button as={'div'} cursor={'pointer'} bg={'none'} fontSize={20} onClick={() => setIsModalOpen(true)}><FiEdit /></Button>
          <Button as={'div'} cursor={'pointer'} bg={'none'} fontSize={20} onClick={() => id && handleDeleteTech(id)}><LuTrash2 /></Button>
        </Flex>
      </Flex>
      <Text fontSize={'18px'} fontWeight={300} color={'#868E96'} >{status}</Text>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Tecnologia</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Nome da Tecnologia</FormLabel>
                <Input isDisabled defaultValue={title} />
                <Text color="red.500">{errors.title?.message}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nível</FormLabel>
                <Select defaultValue={status} {...register("status")}>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </Select>
                <Text color="red.500">{errors.status?.message}</Text>
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
    </Flex>
  );
};
