import React, { useEffect, useState } from 'react';
import UserService from 'services/User';
import { get } from 'lodash';
import SortableTable from 'shared/sortable-table';

const columns = [
  {
    Header: 'Nombre',
    accessor: 'nombre',
  },
  {
    Header: 'Apellido',
    accessor: 'apellido',
  },
  {
    Header: 'Segundo Nombre',
    accessor: 'segundo_nombre',
  },
  {
    Header: 'Segundo Apellido',
    accessor: 'segundo_apellido',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Activo',
    accessor: 'active',
    Cell: ({ row }) => {
      if(row.original.active) {
        return <span>Active</span>
      }
      else {
        return <span>Inactive</span>
      }
    }
  },
];

const Users = () => {
  const [usersData, setUserData] = useState([]);
  const [query, setQuery] = useState({ page: 0 });

  async function fetchUsers(params = {}) {
    const response = await UserService.all(params);
    setUserData(response.data);
    setQuery({ ...params, page: response.data.pagination.page });
  }

  useEffect(() => {
    fetchUsers();
  }, [
    setUserData
  ]);


  return (
    <div>
      <SortableTable
        onSort={(params) => {
          fetchUsers({...params});
        }}
        onPaginate={(params) => {
          fetchUsers({...query, ...params});
        }}
        pagination={get(usersData, 'pagination', [])}
        data={get(usersData, 'records', [])}
        columns={columns} />
    </div>
  );
}

export default Users;
