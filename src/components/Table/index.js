import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import { Headers } from './Headers';
import { Rows } from './Rows';

/*
  Props: 
    - data: Array
    - columns: Array

  data: [object]

  columns: [
    {
      title: string,
      key: string,
      renderData?: function
    }
  ]
*/

function TableComponent({
  data,
  columns,
  haveFooter,
  caption,
  loading,
  ...props
}) {
  return (
    <TableContainer>
      <Table {...props}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          <Tr>
            <Headers columns={columns} />
          </Tr>
        </Thead>
        <Tbody>
          <Rows columns={columns} data={data} loading={loading} />
        </Tbody>
        {haveFooter && (
          <Tfoot>
            <Tr>
              <Headers columns={columns} />
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
}

export { TableComponent };
