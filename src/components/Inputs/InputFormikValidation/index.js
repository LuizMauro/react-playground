import React from 'react';
import { FormControl, FormErrorMessage, FormLabel  } from '@chakra-ui/form-control';
import { Input, InputGroup, Spinner, InputRightAddon } from '@chakra-ui/react';
import { Field, useField }  from 'formik'


function InputFormik({label, ...props}) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size='sm'>
        <Field as={Input} {...field} {...props} />
        <InputRightAddon children={<Spinner/>} />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputFormik;