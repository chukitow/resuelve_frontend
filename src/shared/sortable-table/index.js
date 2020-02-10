import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Pagination } from 'react-bootstrap';
import { noop, isEmpty } from 'lodash';

const SortableTable = ({
  columns = [],
  data = [],
  onSort = noop,
  pagination = { page:1, totalPages: 0 },
  onPaginate = noop,
}) => {
  const {
    toggleSortBy,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true
    },
    useSortBy
  );

  return (
    <>
      <table {...getTableProps({ className: 'table table-striped'})}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                onClick={() => {
                  let queryParams = { page: pagination.page };
                  if(!column.isSorted) {
                    queryParams = {
                      ...queryParams,
                      sortBy: column.id,
                      sortDirection: 'asc'
                    }
                  }
                  else if(column.isSorted && !column.isSortedDesc) {
                    queryParams = {
                      ...queryParams,
                      sortBy: column.id,
                      sortDirection: 'desc'
                    }
                  }

                  onSort(queryParams);
                  toggleSortBy(column.id);
                }}>
                  {column.render('Header')}
                  <span>
                   {column.isSorted
                     ? column.isSortedDesc
                       ? ' 🔽'
                       : ' 🔼'
                     : ''}
                 </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      {
        !isEmpty(data) &&
        <div className="d-flex align-items-center justify-content-center">
          <Pagination>
            <Pagination.First
              disabled={pagination.page === 1}
              onClick={() => {
                onPaginate({ page: 1 });
              }}/>
            <Pagination.Prev
              disabled={pagination.page - 1 === 0}
              onClick={() => {
                onPaginate({ page: pagination.page - 1 });
              }}/>
            <Pagination.Next
              disabled={pagination.page + 1 > pagination.totalPages}
              onClick={() => {
                onPaginate({ page: pagination.page + 1 });
              }}/>
            <Pagination.Last
              disabled={pagination.page === pagination.totalPages }
              onClick={() => {
                onPaginate({ page: pagination.totalPages });
              }}/>
          </Pagination>
        </div>
      }
    </>
  )
};

export default SortableTable;
