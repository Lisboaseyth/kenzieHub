import * as yup from 'yup'

export const schemaWork = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  deploy_url: yup.string().required("Campo obrigatório")
});
