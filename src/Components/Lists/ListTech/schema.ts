import * as yup from 'yup'

export const schemaTech = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  status: yup.string(),
});
