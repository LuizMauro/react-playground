import React, { useState } from 'react';
import { Checkbox, Center } from '@chakra-ui/react';
import { TableComponent } from '../../components/Table';

const data = [
  {
    id: 1,
    name: 'Valor1',
    testeItem: 'valor1-01',
  },
  {
    id: 2,
    name: 'Valor2',
    testeItem: 'valor2-02',
  },
  {
    id: 3,
    name: 'Valor3',
    testeItem: 'valor3-03',
  },
];

function TablePage() {
  const [loading, setLoading] = useState(false);
  const [selecteds, setSelecteds] = useState([data[0]]);

  const onChangeSelect = row => {
    const exists = selecteds.filter(item => item.id === row.id);

    if (exists.length === 0) {
      setSelecteds([...selecteds, row]);
    } else {
      setSelecteds(selecteds.filter(item => item.id !== row.id));
    }
  };

  React.useEffect(() => {
    console.log(selecteds);
  }, [selecteds]);

  const columns = [
    {
      title: 'Selecionar',
      key: 'select',
      renderData: row => (
        <Center>
          <Checkbox
            defaultChecked={
              selecteds.filter(item => item.id === row.id).length > 0
            }
            onChange={() => onChangeSelect(row)}
          />
        </Center>
      ),
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

  return (
    <div>
      <button onClick={tableLoading}>Carregar</button>

      <TableComponent
        variant="striped"
        size="lg"
        data={data}
        columns={columns}
        loading={loading}
      />
    </div>
  );
}

export default TablePage;
