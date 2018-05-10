import React, { Component } from 'react';

import { InfiniteLoader, List} from 'react-virtualized';

const InfiniteLoaderTable = ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage
}) => {
  
  const rowCount = 1000

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = ({startIndex, stopIndex}) => {
    console.log('Start:', startIndex, ' Stop:', stopIndex);
    return loadNextPage(startIndex, stopIndex);
  }

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !!list[index];

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content
    
    if (list[index] === 'loading')
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

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      minimumBatchSize={100}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          height={300}
          width={300}
          rowHeight={100}
          rowCount={rowCount}
          
        />
      )}
    </InfiniteLoader>
  )
}

export default InfiniteLoaderTable;