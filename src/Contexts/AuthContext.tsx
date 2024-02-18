import { createContext } from "react"
import { iAuthProvider, AuthTypes, DataLogin, DataRegister } from "../Types"
import { useNavigate } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import { api } from "../Service"

export const AuthContext = createContext({} as AuthTypes)

export const AuthProvider = ({ children }: iAuthProvider) => {

  const navigate = useNavigate()
  const toast = useToast()

  const loginUser = async (data: DataLogin) => {
    await api.post('/sessions', data)
      .then((resp) => {
        localStorage.setItem('@hub:token', resp.data.token),
        toast({
          title: 'Logado com sucesso',
          description: `Seja bem vindo ${resp.data.user.name}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/dashboard');
      })
      .catch((err) => {
        toast({
          title: 'Erro ao fazer login',
          description: err.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
  };


  const registerUser = async (data: DataRegister) => {
    await api.post('/users', data)
      .then((resp) => {
        console.log(resp.data),
          toast({
            title: 'Registrado com sucesso',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        navigate('/')
      })
  }

  const logoutUser = () => {
    navigate("/")
    toast({
      title: 'Deslogado',
      description: "Você deslogou da sessão",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ logoutUser, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  )
}
