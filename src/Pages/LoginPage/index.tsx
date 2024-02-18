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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "./schema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { AuthContext } from "../../Contexts/AuthContext";
import { DataLogin } from "../../Types";

export const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLogin)
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useContext(AuthContext)

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (data: DataLogin) => {
    // Implementar lógica de login aqui
    loginUser(data);
    console.log("Dados do formulário:", data);
  };

  return (
    <VStack w={'100vw'} h={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Box textAlign={'center'} p={6} maxWidth="400px" mx="auto" bg={'#212529'} w={'70%'} borderRadius={10}>
        <Text color={'blue'} fontSize={'2rem'}>
          Kenzie Hub
        </Text>
        <form style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(handleLogin)}>
        <Text color={'white'} fontSize={'1.5rem'}>
          Login
        </Text>
          <FormControl mb={4}>
            <FormLabel color={'white'}>Email</FormLabel>
            <Input
              color={'white'}
              type="email"
              placeholder="Seu email"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel color={'white'}>Senha</FormLabel>
            <InputGroup size="md">
              <Input
                color={'white'}
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
                  color={'white'}
                  bg={'none'}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <span>{errors.password.message}</span>}
          </FormControl>

          <Button rightIcon={<BiLogIn />} w={'100%'} colorScheme="teal" mb={4} type="submit">
            Logar
          </Button>

        </form>
        <Link href="/register" color="teal.500">
          Registrar
        </Link>
      </Box>
    </VStack>
  );
};
