import React from 'react';
import { Th } from '@chakra-ui/react';

function Headers({ columns }) {
  return columns.map(({ title }, i) => {
    return (
      <Th key={i} width="200px">
        {title}
      </Th>
    );
  });
}

export { Headers };
