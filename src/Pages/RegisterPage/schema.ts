import * as yup from 'yup'

export const schemaRegister = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Campo obrigatório'),
  repeatPass: yup.string().oneOf([yup.ref('password')], 'As senhas devem coincidir').required('Campo obrigatório'),
  bio: yup.string(),
  contact: yup.string().matches(/^\d+$/, 'Contato deve conter apenas números'),
  course_module: yup.string().required('Campo obrigatório'),
});