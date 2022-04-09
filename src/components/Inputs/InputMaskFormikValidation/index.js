import React from 'react';
import { FormControl, FormErrorMessage, FormLabel  } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/react';
import { Field, useField }  from 'formik'


function InputMaskFormikValidation({label, onChangeMask, ...props}) {
  const [field,meta,form] = useField(props);

  const onchange = (e) => {
    if (onChangeMask) {
      const value = onChangeMask(e.target.value);
      form.setValue(value);
      return;
    }
    field.onChange(e);
  }

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Input} {...field} {...props} onChange={onchange}   />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputMaskFormikValidation;