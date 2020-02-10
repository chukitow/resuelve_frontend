import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import UserService from 'services/User';
import MoneyService from 'services/Money';
import { get } from 'lodash';
import SortableTable from 'shared/sortable-table';
import { Button } from 'react-bootstrap';
import { mapMovementData, convertAndMap } from './helpers';

const Movements = () => {
  const routerParams = useParams();
  const [rates, setRates] = useState({});
  const [movementsData, setMovementData] = useState([]);
  const [query, setQuery] = useState({ page: 0 });
  const convert = (movement) => {
    setMovementData({
      ...movementsData,
      records: convertAndMap({ movement, collection: movementsData.records, rates})
    });
  };

  const columns = [
    {
      Header: 'Descrición',
      accessor: 'description',
    },
    {
      Header: 'Tipo',
      accessor: 'type',
    },
    {
      Header: 'Cantidad',
      accessor: 'amount',
      Cell: ({ row }) => {
        return <span>${row.original.amount_converted.toFixed(2)} {row.original.currency}</span>
      }
    },
    {
      Header: '',
      accessor: 'convertion',
      Cell: ({ row }) => {
        return (
          <Button onClick={() => convert(row.original)}>
            Convertir {row.original.currency === 'MXN' ? 'USD' : 'MXN'}
          </Button>
        )
      }
    }
  ];

  async function fetchMovements(id, params = {}) {
    const response = await UserService.movements(id, params);
    setMovementData(mapMovementData(response.data));
    setQuery({ ...params, page: response.data.pagination.page });
  }

  useEffect(() => {
    async function getRates() {
      const response = await MoneyService.conversion();
      setRates(response.data);
    }

    getRates();
    fetchMovements(routerParams.id);
  }, [
    routerParams
  ]);


  return (
    <div>
      <SortableTable
        onSort={(params) => {
          fetchMovements(routerParams.id, {...params});
        }}
        onPaginate={(params) => {
          fetchMovements(routerParams.id, {...query, ...params});
        }}
        pagination={get(movementsData, 'pagination', [])}
        data={get(movementsData, 'records', [])}
        columns={columns} />
    </div>
  );
}

export default Movements;
