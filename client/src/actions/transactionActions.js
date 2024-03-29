export const fetchTransactions = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    dispatch({
      type: "FETCH_TRANSACTIONS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_TRANSACTIONS_ERROR",
      payload: error,
    });
  }
};

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    const data = await response.json();
    dispatch({
      type: "ADD_TRANSACTION_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TRANSACTION_ERROR",
      payload: error,
    });
  }
};
