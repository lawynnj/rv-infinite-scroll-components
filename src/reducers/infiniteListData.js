import {
  LOAD_NEXT_PAGE,
  NEXT_PAGE_LOADING
} from '../actions/types';

const initialState = {
  list: []
}
export default function (state=initialState, action) {
  
  let tempList = [];
  
  const initialRowData = {
    seqno: 'loading',
    fields: {
      AcctCode:'loading'
    }
  }

  switch(action.type) {
    case NEXT_PAGE_LOADING:
      if(state.list.length) { // has a length > 0
        tempList = state.list.slice();
      }
      for(let i = action.payload.startIndex; i < action.payload.stopIndex; i++)
        tempList[i] = initialRowData;
      return {...state, isNextPageLoading: true, list: tempList }

    case LOAD_NEXT_PAGE:
      const { data } = action.payload;
      
      if(state.list.length) {
        tempList = state.list.slice(); // create new array
      }

      let x = 0;
      for (let i = action.payload.startIndex; i < action.payload.stopIndex; i++) {
        tempList[i] = (JSON.stringify(tempList[i]) !== JSON.stringify(initialRowData) ? tempList[i] : data[x]);
        x++;
      }

      return {...state, isNextPageLoading: false, list: tempList }
    
    default:
      return state;
  }
}