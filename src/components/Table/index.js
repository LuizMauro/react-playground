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
import { PaginationComponent } from './Pagination';

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
  columnsFooter,
  caption,
  loading,
  pageCurrent,
  pageSize,
  totalItens,
  totalPages,
  onChangePage,
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
        {columnsFooter && (
          <Tfoot>
            <Tr>
              <Headers columns={columns} />
            </Tr>
          </Tfoot>
        )}
      </Table>
      <PaginationComponent
        pageSize={pageSize}
        pageCurrent={pageCurrent}
        totalItens={totalItens}
        onPageChange={onChangePage}
      />
    </TableContainer>
  );
}

export { TableComponent };
