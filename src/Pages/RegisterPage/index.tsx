import { useForm } from "react-hook-form";
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Link,
  Text,
  VStack,
  Select,
  Image,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "./schema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { DataRegister } from "../../Types";
import { AuthContext } from "../../Contexts/AuthContext";
import Back from "../../assets/bg.jpg"

export const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaRegister)
  });
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser } = useContext(AuthContext)

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (data: DataRegister) => {
    // Implementar lógica de login aqui
    registerUser(data)

  };

  return (
    <VStack w={'100vw'} h={'100vh'} display={'flex'} overflow={'auto'}>
      <Image src={Back} zIndex={-1} position={'absolute'} />
      <Box textAlign={'center'} p={6} maxWidth="400px" mx="auto" bg={'white'} boxShadow={"0 9px 20px 5px rgba(0, 0, 0, 0.1)"} w={'70%'} borderRadius={10}>
        <Text color={'#00baff'} fontSize={'2rem'}>
          Kenzie Hub
        </Text>
        <form style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(handleRegister)}>
          <Text color={'#00baff'} fontSize={'1.5rem'}>
            Registro
          </Text>
          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Nome</FormLabel>
            <Input
              color={'#00baff'}
              placeholder="Seu Nome"
              {...register("name")}
            />
            {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Email</FormLabel>
            <Input
              color={'#00baff'}
              type="email"
              placeholder="Seu email"
              {...register("email")}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Senha</FormLabel>
            <InputGroup size="md">
              <Input
                color={'#00baff'}
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="md"
                  onClick={handlePasswordVisibility}
                  color={'#00baff'}
                  bg={'none'}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Repita sua senha</FormLabel>
            <InputGroup size="md">
              <Input
                color={'#00baff'}
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                {...register("repeatPass")}
              />
            </InputGroup>
            {errors.repeatPass && <span style={{ color: 'red' }}>{errors.repeatPass.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Bio</FormLabel>
            <Input
              color={'#00baff'}
              placeholder="Conte um pouco sobre você"
              {...register("bio")}
            />
            {errors.bio && <span>{errors.bio.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Contato</FormLabel>
            <InputGroup size="md">
              <Input
                color={'#00baff'}
                placeholder="Seu contato"
                {...register("contact", {
                  pattern: {
                    value: /^\d+$/,
                    message: 'Contato deve conter apenas números',
                  },
                })}
              />
            </InputGroup>
            {errors.contact && <span style={{ color: 'red' }}>{errors.contact.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'#00baff'}>Selecione o Módulo</FormLabel>
            <Select color={'#00baff'} placeholder="Selecione o módulo" {...register('course_module')}>
              <option style={{ background: '#212529' }} value="1º Módulo">1º Módulo</option>
              <option style={{ background: '#212529' }} value="2º Módulo">2º Módulo</option>
              <option style={{ background: '#212529' }} value="3º Módulo">3º Módulo</option>
              <option style={{ background: '#212529' }} value="4º Módulo">4º Módulo</option>
              <option style={{ background: '#212529' }} value="5º Módulo">5º Módulo</option>
              <option style={{ background: '#212529' }} value="6º Módulo">6º Módulo</option>
            </Select>
          </FormControl>

          <Button rightIcon={<BiLogIn />} w={'100%'} colorScheme="teal" mb={4} type="submit">
            Registrar
          </Button>

        </form>
        <Link href="/" color="teal.500">
          Logar
        </Link>
      </Box>
    </VStack>
  );
};
