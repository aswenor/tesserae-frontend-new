import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';

import BodyRow from './BodyRow';
import BodyScrollTable from '../../common/BodyScrollTable';
import Header from './Header';


function Table(props) {
  const { textList } = props;

  const [ pagination, setPagination ] = useState({
    currentPage: 0,
    rowsPerPage: 10,
    sortHeader: 'author',
    sortOrder: 1
  });
  
  const [ displayRows, setDisplayRows ] = useState([]);

  useEffect(() => {
    const start = pagination.currentPage * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;
    setDisplayRows(
      orderBy(
        textList,
        pagination.sortHeader,
        pagination.sortOrder === 1 ? 'asc' : 'desc'
      )
      .slice(start, end)
      .map(item => <BodyRow text={item} />));
  }, [pagination, textList]);

  const updatePagination = (newPagination) => {
    setPagination({...pagination, ...newPagination});
  };

  return (
    <BodyScrollTable
      bodyCount={textList.length}
      bodyRows={displayRows}
      initialRowsPerPage={10}
      pagination={pagination}
      rowsPerPageLabel="Texts Per Page"
      rowsPerPageOptions={[10, 25, 50, 100]}
      updatePagination={updatePagination}
    >
      <Header
        sortHeader={pagination.sortHeader}
        sortOrder={pagination.sortOrder}
        updatePagination={updatePagination}
      />
      {displayRows}
    </BodyScrollTable>
  );
}


export default Table;