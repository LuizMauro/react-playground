import React, { useState } from 'react';
import PropTypes  from 'prop-types';
import { Flex, Stack, Container, Button, ButtonGroup } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import InputFormikValidation from '../../components/Inputs/InputFormikValidation';
import SelectFormikValidation from '../../components/Inputs/SelectFormikValidation';
import InputMaskFormikValidation from '../../components/Inputs/InputMaskFormikValidation copy'


const _schemaValidation = Yup.object({
  teste: Yup.string().required("Campo obrigatório"),
  companyName: Yup.string().required("Campo obrigatório"),
  tradeName: Yup.string().required("Campo obrigatório"),
  businessType: Yup.string().required("Campo obrigatório"),
  monthlyIncome: Yup.number().required("Campo obrigatório"),
  cnae: Yup.string().required("Campo obrigatório"),
  phoneNumber: Yup.string().required("Campo obrigatório"),
  emailAddress: Yup.string().required("Campo obrigatório"),
  incorporationDate: Yup.string().required("Campo obrigatório"),
  documentNumber: Yup.string().required("Campo obrigatório"),
  documentType: Yup.string().required("Campo obrigatório"),
});

  function FormularioFormik({data}) {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const handleSubmit = async (values) => {
    setLoadingRequest(true);
    console.log(values);
    setTimeout(() => {
      setLoadingRequest(false);
      console.log(values);
    }, 2000)
  };


  const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }


  return (
    <Formik
      validationSchema={_schemaValidation}
      onSubmit={handleSubmit}
      initialValues={data}
      validateOnChange={true}
    >
        <Container maxW="container.xl">
          <Form>
            <Stack
                align={"center"}
                justifyContent={"center"}
                direction={{ base: "column", md: "row" }}
              >
                {/* Column 1 */}
                <Flex
                  flex={1}
                  justifyContent={"center"}
                  align={"center"}
                  position={"relative"}
                  w={"full"}
                >
                  <Stack
                  spacing={3}
                  w={"full"}
                  justifyContent={"center"}
                  align="center"
                >
                    {/* Inputs */}
                    <InputMaskFormikValidation label={"teste"} name="teste" w={"md"} bg={"white"} onChangeMask={(e) => {return cpfMask(e)}} />
                    <InputFormikValidation label={"CNAE"} name="cnae"   w={"md"} bg={"white"}/>
                  </Stack>
                </Flex>

                {/* Column 2 */}
                <Flex
                  flex={1}
                  justifyContent={"center"}
                  align={"center"}
                  position={"relative"}
                  w={"full"}
                >
                  <Stack
                  spacing={3}
                  w={"full"}
                  justifyContent={"center"}
                  align="center"
                > 
                    {/* Inputs */}
                    <InputFormikValidation label={"Phone number"} name="phoneNumber"  w={"md"} bg={"white"}/>
                    <SelectFormikValidation label={"Document type"} name="documentType"  w={"md"} bg={"white"}>
                      <option value="" disabled></option>
                      <option value={"CNPJ"}>CNPJ</option>
                      <option value={"CPF"}>CPF</option>
                    </SelectFormikValidation>
                  </Stack>
                </Flex>
              </Stack>

            <ButtonGroup w="full" mt={6} space={3} justifyContent="end">
              <Button type="submit" colorScheme="green" isLoading={loadingRequest} disabled={loadingRequest}>
                Salvar
              </Button>
            </ButtonGroup>
          </Form>
        </Container>
    </Formik>
  );
}

FormularioFormik.propTypes = {
  data: PropTypes.exact({
    companyName: PropTypes.string,
    tradeName: PropTypes.string,
    businessType: PropTypes.string,
    monthlyIncome: PropTypes.number,
    cnae: PropTypes.string,
    phoneNumber: PropTypes.string,
    emailAddress: PropTypes.string,
    incorporationDate: PropTypes.string,
    documentNumber: PropTypes.string,
    documentType: PropTypes.string,
  }).isRequired,
}

export default FormularioFormik;
