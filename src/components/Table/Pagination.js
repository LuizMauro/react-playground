import React from 'react';
import { Stack, Flex, Button } from '@chakra-ui/react';
import { DOTS, usePagination } from './UsePagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function PaginationComponent({
  pageCurrent,
  totalItens,
  onPageChange,
  pageSize,
}) {
  const paginationRange = usePagination({
    currentPage: pageCurrent,
    totalCount: totalItens,
    siblingCount: 1,
    pageSize: pageSize,
  });

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onPageChange(pageCurrent + 1);
  };

  const onPrevious = () => {
    onPageChange(pageCurrent - 1);
  };

  const PaginationDots = () => {
    return paginationRange.map(pageNumber => {
      if (pageNumber === DOTS) {
        return <Button disabled={true}>&#8230;</Button>;
      } else {
        return (
          <Button
            onClick={() => onPageChange(pageNumber)}
            bg={pageCurrent === pageNumber ? 'blue.400' : 'teal.400'}
          >
            {pageNumber}
          </Button>
        );
      }
    });
  };

  return (
    <Flex p={8}>
      <Stack
        justify="center"
        width={'100%'}
        align="center"
        direction="row"
        spacing={2}
      >
        <Button disabled={pageCurrent === 1} onClick={onPrevious}>
          <ChevronLeftIcon />
        </Button>
        <PaginationDots />
        <Button onClick={onNext} disabled={pageCurrent === lastPage}>
          <ChevronRightIcon />
        </Button>
      </Stack>
    </Flex>
  );
}

export { PaginationComponent };
