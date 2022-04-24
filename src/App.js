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
import { FormUpload } from './pages/FormUpload';
import TabelaPage from './pages/TablePage';

const _NAME_PAGES = [
  {
    name: 'Tabela',
    component: TabelaPage,
  },
  {
    name: 'Formulario',
    component: FormularioFormik,
  },
  {
    name: 'Upload',
    component: FormUpload,
  },
];

function App() {
  const [componentPage, setComponentPage] = useState(0);

  const changePageComponent = componentSelected => {
    setComponentPage(componentSelected);
  };

  const ComponentPage = index => {
    const Component = _NAME_PAGES[index].component;
    return <Component />;
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex flex={1} py={10} justify="center" alignItems="center">
        <ButtonGroup variant="solid" spacing="6">
          {_NAME_PAGES.map(({ name, component }, i) => (
            <Button
              colorScheme="cyan"
              rounded={false}
              onClick={() => changePageComponent(i)}
              key={i}
            >
              {name}
            </Button>
          ))}
          <ColorModeSwitcher />
        </ButtonGroup>
      </Flex>

      <Flex
        flex={1}
        justify="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        {ComponentPage(componentPage)}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
