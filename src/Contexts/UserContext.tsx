import { createContext, useState } from 'react'
import { Tech, TechUpdate, User, UserTypes, UserUpdate, Work, WorkUpdate, iUserProvider } from '../Types'
import { api } from '../Service'
import { useToast } from '@chakra-ui/react'

export const UserContext = createContext({} as UserTypes)

export const UserProvider = ({ children }: iUserProvider) => {

  const [user, setUser] = useState({} as User)
  const [users, setUsers] = useState([] as User[])
  const toast = useToast()

  const handleGetUser = async () => {
    try {
      const resp = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
        }
      });
      setUser({ ...resp.data }); // Create a new object
    } catch (err) {
      console.log(err);
    }
  }

  const handleGetUsers = async () => {
    try {
      const resp = await api.get('/users');
      setUsers(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateUser = async (data: UserUpdate) => {
    try {
      const resp = await api.put('/profile ', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
        }
      });
      setUsers(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCreateTech = async (data: Tech) => {
    api.post('/users/techs', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
        toast({
          title: 'Tecnologia adicionada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleGetUser();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const handleUpdateTech = async (data: TechUpdate, idTech: string) => {
    api.put(`users/techs/${idTech}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
        toast({
          title: 'Tecnologia atualizada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleGetUser();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const handleDeleteTech = async (id: string) => {
    api.delete(`/users/techs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
        toast({
          title: 'Tecnologia excluida com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleGetUser();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const handleCreateWork = async (data: Work) => {
    api.post('/users/works', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
        toast({
          title: 'Trabalho criado com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleGetUser();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const handleUpdateWork = async (data: WorkUpdate, idWork: string) => {
    api.put(`users/works/${idWork}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
        toast({
          title: 'Trabalho atualizado com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleGetUser();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const handleDeleteWork = async (id: string) => {
    api.delete(`/users/works/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
        toast({
          title: 'Projeto excluido com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleGetUser();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const valuesContext = {
    user,
    users,
    handleGetUser,
    handleGetUsers,
    handleUpdateUser,
    handleCreateTech,
    handleUpdateTech,
    handleDeleteTech,
    handleCreateWork,
    handleUpdateWork,
    handleDeleteWork,
  }

  return (
    <UserContext.Provider value={valuesContext}>
      {children}
    </UserContext.Provider>
  )
}
