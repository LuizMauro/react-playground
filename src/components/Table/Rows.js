import React from 'react';
import { Tr, Td, Skeleton } from '@chakra-ui/react';

function Rows({ data, columns, loading }) {
  if (loading) {
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <Tr key={index}>
            {columns.map(column => (
              <Td key={column.key}>
                <Skeleton flex={1} width="100%" height="20px" />
              </Td>
            ))}
          </Tr>
        ))}
      </>
    );
  }

  return data.map((row, i) => {
    return (
      <Tr key={i}>
        {columns.map(({ key, renderData }, j) => {
          return <Td key={j}>{renderData ? renderData(row) : row[key]}</Td>;
        })}
      </Tr>
    );
  });
}

export { Rows };
