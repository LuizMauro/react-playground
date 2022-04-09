import React from 'react';
import Form from './Form'

const data = {
  "companyName": "Cummings Group",
  "tradeName": "Refined Concrete Tuna",
  "businessType": "LTDA",
  "monthlyIncome": 0,
  "cnae": "7020-4/00",
  "phoneNumber": "81995537903",
  "emailAddress": "gabriel.stimamiglio@somosphi.com",
  "incorporationDate": "2018-01-29",
  "documentNumber": "38145498000153",
  "documentType": ""
};


function FormularioFormik() {
  return (
    <>
      <Form data={data} />
    </>
  );
}

export default FormularioFormik;