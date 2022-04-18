import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Stack,
  Container,
  Button,
  ButtonGroup,
  InputGroup,
  InputRightAddon,
  Spinner,
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputFormikValidation from '../../components/Inputs/InputFormikValidation';
import SelectFormikValidation from '../../components/Inputs/SelectFormikValidation';
import InputMaskFormikValidation from '../../components/Inputs/InputMaskFormikValidation copy';

const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'application/pdf',
];

function checkIfFilesAreTooBig(file) {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      valid = false;
    }
  }
  return valid;
}

function checkIfFilesAreCorrectType(file) {
  let valid = true;
  if (file) {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      valid = false;
    }
  }
  return valid;
}

const _schemaValidation = Yup.object({
  files: Yup.array()
    .of(
      Yup.mixed()
        .test('sizeFile', 'tamanho do arquivo não suportado', file => {
          return checkIfFilesAreTooBig(file);
        })
        .test('typeFile', 'tipo de arquivo não suportado', file => {
          return checkIfFilesAreCorrectType(file);
        })
    )
    .max(3, 'Máximo de 3 arquivos'),
});

function FormularioFormik({ data }) {
  const [loadingRequest, setLoadingRequest] = useState(false);

  const handleSubmit = async values => {
    const formData = new FormData();

    if(values.files) {
      values.files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    for (let [key, value] of formData) {
      console.log(key, value)
    }
  };

  const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  return (
    <Formik
      validationSchema={_schemaValidation}
      onSubmit={handleSubmit}
      initialValues={{}}
      validateOnChange={true}
    >
      {({ formik, isSubmitting }) => (
        <Form>
          <Field name="files">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.files && form.touched.files}>
                <FormLabel>teste</FormLabel>
                <Input
                  type={'file'}
                  name="files"
                  multiple
                  onChange={event => {
                    const files = Array.from(event.target.files);
                    form.setFieldValue(field.name, files);
                  }}
                />
                <FormErrorMessage>{form.errors.files}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <ButtonGroup w="full" mt={6} space={3} justifyContent="end">
            <Button
              type="submit"
              colorScheme="green"
              isLoading={loadingRequest}
              disabled={loadingRequest}
            >
              Salvar
            </Button>
          </ButtonGroup>
        </Form>
      )}
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
};

export default FormularioFormik;
