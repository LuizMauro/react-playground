import React, { useState } from 'react';
import {
  ChakraProvider,
  Flex, 
  Button, 
  ButtonGroup,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import FormularioFormik from './pages/FormularioFormik';


const _NAME_PAGES = [{
  name: 'Formulario',
  component: FormularioFormik,
}, {
  name: 'Teste',
  component: () => <h1>Teste</h1>
}];


function App() {
  const [componentPage, setComponentPage] = useState(_NAME_PAGES[0].component);

  const changePageComponent = (componentSelected) => {
    setComponentPage(componentSelected);
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex flex={1} py={10} justify="center" alignItems="center">
        <ButtonGroup variant='solid' spacing='6'>
          {_NAME_PAGES.map(({name, component}, i) => <Button colorScheme='cyan' rounded={false} onClick={() => changePageComponent(component)} key={i}>{name}</Button>)}
          <ColorModeSwitcher/>
        </ButtonGroup>
      
      </Flex>

      <Flex flex={1} justify="center" alignItems="center" style={{height: '100vh'}}>
        {componentPage}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
