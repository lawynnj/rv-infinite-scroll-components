import axios from 'axios';

import {
  NEXT_PAGE_LOADING,
  LOAD_NEXT_PAGE,
} from './types';

export const loadNextPage = (startIndex, stopIndex) => async dispatch => {

  dispatch({
    type: NEXT_PAGE_LOADING,
    payload: {
      startIndex,
      stopIndex
    }
  });

  try {
      //console.log('loadNextPage aaction', process.env.REACT_APP_DETAIL_QUERY)
      const response = await axios.post(`${process.env.REACT_APP_DETAIL_QUERY}&start=${startIndex === 0 ? startIndex : (startIndex + 1)}&limit=${stopIndex}`)
      //console.log('data', response);
      const data = response.data.Detail;
      //   Store response data in list...
      dispatch({
        type: LOAD_NEXT_PAGE,
        payload: {
          data,
          startIndex,
          stopIndex
        }
      })
  } catch (error) {
    console.log('Error:', error);
  }
}