import React, { useState, useEffect } from 'react';
import { Checkbox, Center } from '@chakra-ui/react';
import { TableComponent } from '../../components/Table';
import { getData } from '../../offlineData';

function TablePage() {
  const [loading, setLoading] = useState(false);
  const [selecteds, setSelecteds] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItens, setTotalItens] = useState(0);

  const onChangeSelect = row => {
    const exists = selecteds.filter(
      item => item.id.toString() === row.id.toString()
    );

    console.log('EXIST', exists);

    if (exists.length === 0) {
      setSelecteds([...selecteds, row]);
    } else {
      setSelecteds([
        ...selecteds,
        selecteds.filter(item => item.id.toString() !== row.id.toString()),
      ]);
    }
  };

  const onChangePage = async page => {
    setCurrentPage(page);
    setLoading(true);
    const { data, totalItens } = await getData(pageSize, page);
    setTotalItens(totalItens);
    setData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    console.log('SELECTS', selecteds);
  }, [selecteds]);

  const columns = [
    {
      title: 'Selecionar',
      key: 'select',
      renderData: row => {
        console.log('ROW', row);
        return (
          <Center>
            <Checkbox
              defaultChecked={
                selecteds.filter(
                  item => item.id?.toString() === row.id?.toString()
                ).length > 0
              }
              onChange={() => onChangeSelect(row)}
            />
          </Center>
        );
      },
    },
    {
      title: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      key: 'name',
    },
    {
      title: 'Editar',
      key: 'edit',
      renderData: row => {
        return (
          <div>
            <button
              onClick={() => {
                alert(`Editar ${row.name}`);
              }}
            >
              Editar
            </button>
          </div>
        );
      },
    },
  ];

  const tableLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    onChangePage(currentPage);
  }, []);

  return (
    <div>
      <button onClick={tableLoading}>Carregar</button>

      <TableComponent
        variant="striped"
        size="lg"
        data={data}
        columns={columns}
        loading={loading}
        pageCurrent={currentPage}
        onChangePage={onChangePage}
        pageSize={pageSize}
        totalItens={totalItens}
      />
    </div>
  );
}

export default TablePage;
