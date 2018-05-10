import React, { Component } from 'react';

import { InfiniteLoader, List, Table, Column, defaultTableRowRenderer } from 'react-virtualized';

const InfiniteLoaderTable = ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage
}) => {
  console.log("Calling InfiniteLoaderTable", list);
  
  const rowCount = 1000
  
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = ({startIndex, stopIndex}) => {
    console.log('Start:', startIndex, ' Stop:', stopIndex);
    return loadNextPage(startIndex, stopIndex);
  }

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => { 
    console.log('isRowLoaded', list[index]);
    return !!list[index];}

  function RowHof(rowRendererFn) {
    function tableRowFn(props) {
      console.log('RowHof', props);
      return rowRendererFn({
        ...props
      });
    }
  
    return tableRowFn;
  }

  const RowRenderer = RowHof(defaultTableRowRenderer);

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      minimumBatchSize={100}
    >
      {({ onRowsRendered, registerChild }) => (
        <Table
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            width={300}
            height={300}
            headerHeight={20}
            rowHeight={30}
            rowCount={rowCount}
            rowRenderer={RowRenderer}
            rowGetter = {({ index }) =>{ 
              console.log("rowGetter:", list[index]);
              return list[index] === undefined ? {seqno: 'loading', fields: { AcctCode:'loading'}} : list[index]}}
          >
            <Column cellDataGetter={({rowData})=> { 
              console.log('AcctCode', rowData);
              
              return rowData.fields.AcctCode }} width={100} label="AcctCode" dataKey='AcctCode'/>
            <Column width={100} label="Seq. No." dataKey='seqno'/>
          </Table>
      )}
    </InfiniteLoader>
  )
}

export default InfiniteLoaderTable;