const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TRANSACTIONS_SUCCESS":
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_TRANSACTIONS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_TRANSACTION_SUCCESS":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        loading: false,
        error: null,
      };
    case "ADD_TRANSACTION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
