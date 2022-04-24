import React from 'react';
import {
  Button,
  ButtonGroup,
  FormErrorMessage,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import UploadComponent from '../../components/Upload';

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

function FormUpload() {
  const handleSubmit = async values => {
    const formData = new FormData();


    values.files.forEach(file => {
      console.log(file);
    });

    if (values.files) {
      formData.append(`files`, values.files);
    }

    for (let [key, value] of formData) {
      console.log(key, value);
    }
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
                <UploadComponent
                  suportedFormats={SUPPORTED_FORMATS}
                  maxFiles={3}
                  onChange={files => {
                    form.setFieldValue(field.name, files);
                  }}
                />
                <FormErrorMessage>{form.errors.files}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <ButtonGroup w="full" mt={6} space={3} justifyContent="end">
            <Button type="submit" colorScheme="green">
              Salvar
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
}

export { FormUpload };
