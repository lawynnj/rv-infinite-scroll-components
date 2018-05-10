import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import axios from 'axios';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { InfiniteLoader, List } from 'react-virtualized';

import 'react-virtualized/styles.css'; // only needs to be imported once

// This example assumes you have a way to know/load this information
const remoteRowCount=1500;

let list = [];

function isRowLoaded ({ index }) {
  return !!list[index];
}

function loadMoreRows ({ startIndex, stopIndex }) {
  for (var i = startIndex; i < stopIndex; i++) {
    list[i] = 'loading';
  }
  console.log('Fetch index:', startIndex, 'to:', stopIndex);
  return axios.post(`${process.env.REACT_APP_DETAIL_QUERY}&start=${startIndex}&limit=${stopIndex}`)
    .then(response => {
      console.log('data', response);
      const data = response.data.Detail;
      //   Store response data in list...
      const y = data.map(a => a.seqno);
      let x = 0;
      for (let i = startIndex; i < stopIndex; i++) {
        list[i] = (list[i] != 'loading' ? list[i] : y[x]);
        x++;
      }
      // Store response data in list...
    })
}

function rowRenderer ({ key, index, style}) {
  if (list[index] == 'loading')
    return (<div key={key} style={style}>
      Item {index}, is loading.
    </div>)

  return (
    <div
      key={key}
      style={style}
    >
      Item: {list[index]}
    </div>
  )
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
      <List
        height={200}
        onRowsRendered={onRowsRendered}
        ref={registerChild}
        rowCount={remoteRowCount}
        rowHeight={20}
        rowRenderer={rowRenderer}
        width={300}
      />
    )}
  </InfiniteLoader>,
  document.getElementById('root')
);
registerServiceWorker();

