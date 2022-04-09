import React from 'react';
import { FormControl, FormErrorMessage, FormLabel  } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/react';
import { Field, useField }  from 'formik'


function InputFormik({label, ...props}) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Input} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputFormik;