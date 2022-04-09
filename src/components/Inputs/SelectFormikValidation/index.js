import React from 'react';
import { FormControl, FormErrorMessage, FormLabel  } from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/react';
import { Field, useField }  from 'formik'


function SelectFormik({label, children, ...props}) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Select} {...field} {...props}>
        {children}
      </Field>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default SelectFormik;