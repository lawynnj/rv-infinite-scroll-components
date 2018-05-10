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


let stop = 0;
let start = 0;
function loadMoreRows ({ startIndex, stopIndex }) {
  for (var i = startIndex; i < stopIndex; i++) {
    list[i] = 'loading';
  }
  console.log('Fetch index:', startIndex, 'to:', stopIndex);
  return axios.post(`http://dev.discernica.com/cgi-bin/wspd_cgi.sh/WService=EDZARWSB/OEPX/handler.p?object=gl.DetailQuery&CDList=0005|0&AcctList=1110&FromDate=2017-01-01&action=query&userid=jim&start=${startIndex}&limit=${stopIndex}`)
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
// async function loadMoreRows ({ startIndex, stopIndex}) {
//     if (true) {
//     console.log('Start index: ', startIndex, ' End index: ', stopIndex);
//     // start = stop;
//     // stop = stopIndex;
//     start = startIndex
//     stop = stopIndex
//     //?object=gl.DetailQuery&CDList=0005|0&AcctList=1110&FromDate=2017-01-01&action=query&userid=jim&limit=100
//     const response = await axios.post(`http://dev.discernica.com/cgi-bin/wspd_cgi.sh/WService=EDZARWSB/OEPX/handler.p?object=gl.DetailQuery&CDList=0005|0&AcctList=1110&FromDate=2017-01-01&action=query&userid=jim&start=${start}&limit=${stop}`);
//     console.log('Bank Acc', response.data.Detail);
//     const data = response.data.Detail;
//                 //   Store response data in list...
//     const y = data.map(a => a.seqno);
//     // const x = _(data)
//     //     .flatMapDeep(_.values)
//     //     .map('first_name')
//     //     .value(); 
    
//         let i = 0; 
//         let x = 0;      
//         for(i = start; i < stop; i++) {
//             list[i] = y[x];
//             x++;
//         }
//         // console.log(list[list.length-1]);
//     }
// }

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

