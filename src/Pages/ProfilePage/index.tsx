import React, { useContext, useEffect } from 'react'
import { HeaderComponent } from '../../Components/Header';
import { Button, Flex, FormControl, FormLabel, Image, Input, ModalFooter, Text, Textarea } from '@chakra-ui/react';
import { UserContext } from '../../Contexts/UserContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserUpdate } from '../../Types';
import { schemaUser } from './schema';

export const ProfilePage = () => {

  const { user, handleGetUser, handleUpdateUser } = useContext(UserContext)

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
    resolver: yupResolver(schemaUser)
  });

  const onSubmit = async (data: UserUpdate) => {
    try {
      await handleUpdateUser(data);
      reset();
    } catch (error) {
      console.error("Error adding technology:", error);
    }
  }

  useEffect(() => {
    handleGetUser()
  }, []);

  return (
    <>
      <HeaderComponent />
      <Flex w={'100%'} justifyContent={'center'} alignItems={'center'} p={['10px', '10px 10%']} gap={5}>
        {/* <Flex w={'100%'} bg={'white'} padding={['15px 25px', '30px']} borderRadius={10} alignItems={['flex-start', 'center']} justifyContent={['space-between']} direction={['column', 'row']}>
                <Text fontSize={'22px'} fontWeight={700} color={'#00baff'}>{user.name}</Text>
                <Text fontSize={'18px'} fontWeight={300} color={'#00baff'}>{user.course_module}</Text>
              </Flex>
              <ListTech />
              <ListWork />
              <MobileNav /> */}
        <Flex bg={'white'} alignItems={'center'} gap={10} p={10} borderRadius={'10px'}>

          <Image w={'200px'} h={'200px'} borderRadius={'50%'} bg={'red'} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex >
              <Flex direction={'column'} >
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input {...register("name")} />
                  <Text color="red.500">{errors.name?.message}</Text>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} />
                  <Text color="red.500">{errors.email?.message}</Text>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Sobre você</FormLabel>
                  <Textarea {...register("bio")} />
                  <Text color="red.500">{errors.bio?.message}</Text>
                </FormControl>
              </Flex>
              <Flex direction={'column'}>
                <FormControl mt={4}>
                  <FormLabel>Senha antiga</FormLabel>
                  <Input {...register("old_password")} />
                  <Text color="red.500">{errors.old_password?.message}</Text>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Senha</FormLabel>
                  <Input {...register("password")} />
                  <Text color="red.500">{errors.password?.message}</Text>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Repita a senha</FormLabel>
                  <Input {...register("repeatPass")} />
                  <Text color="red.500">{errors.repeatPass?.message}</Text>
                </FormControl>
              </Flex>
            </Flex>
            <Button colorScheme="blue" mr={3} type="submit" isDisabled={!isDirty}>
              Atualizar
            </Button>
          </form>
        </Flex>
      </Flex >
    </>
  )
}