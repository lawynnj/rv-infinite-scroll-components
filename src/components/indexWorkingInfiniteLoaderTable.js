import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import axios from 'axios';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { InfiniteLoader, Table, Column, defaultTableRowRenderer } from 'react-virtualized';

import 'react-virtualized/styles.css'; // only needs to be imported once

// This example assumes you have a way to know/load this information
const remoteRowCount=1500;

let list = [];

function isRowLoaded ({ index }) {
  return !!list[index];
}

const RowHof = (rowRendererFn) => {
  function tableRowFn(props) {
    return rowRendererFn({
      ...props
    })
  }
}
const RowRenderer = RowHof(defaultTableRowRenderer);

const initialRowState = {seqno:'loading', fields: {AcctCode: 'loading', Amount: 'loading'}, pk:'loading'};

const loadMoreRows = async ({ startIndex, stopIndex }) => {
  for (var i = startIndex; i < stopIndex; i++) {
    list[i] = initialRowState; // initial fields
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_DETAIL_QUERY}&start=${startIndex}&limit=${stopIndex}`);
    const data = response.data.Detail;
    let x = 0;
    for (let i = startIndex; i < stopIndex; i++) {
      list[i] = (list[i] != initialRowState ? list[i] : data[x]);
      x++;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}


// Render your list
ReactDOM.render(
  <InfiniteLoader
    isRowLoaded={isRowLoaded}
    loadMoreRows={loadMoreRows}
    rowCount={remoteRowCount}
    minimumBatchSize={200}
  >
  {({ onRowsRendered, registerChild }) => (
    <Table
      rowGetter={({index}) => list[index] === undefined ? initialRowState : list[index]}
      rowRenderer={RowRenderer}
      onRowsRendered={onRowsRendered}
      rowCount={remoteRowCount}
      height={300}
      rowHeight={50}
      width={300}
      > 
      <Column 
        cellDataGetter={({rowData }) => { const x = rowData.fields.Amount; console.log('rowData', rowData); if(x) return x; else return ''; } }
        label='' width={100} dataKey='AcctCode'/>
      <Column label='Seq. No.' width={100} dataKey='pk'/>
      <Column label='Seq. No.' width={100} dataKey='seqno'/>
      
  </Table> )}
  </InfiniteLoader>,
  document.getElementById('root')
);
registerServiceWorker();
