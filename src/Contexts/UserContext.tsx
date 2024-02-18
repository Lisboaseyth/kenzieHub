import { createContext, useEffect, useState } from 'react'
import { Tech, User, UserTypes, Work, iUserProvider } from '../Types'
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

  const handleCreateTech = async (data: Tech) => {
    api.post('/users/techs', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
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
    api.post('/users/techs', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@hub:token')}`
      }
    })
      .then(() => {
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
    handleCreateTech,
    handleCreateWork
  }

  return (
    <UserContext.Provider value={valuesContext}>
      {children}
    </UserContext.Provider>
  )
}
