import { combineReducers } from "redux";
import transactionReducer from "./transactionReducer";
import invoiceReducer from "./invoiceReducer";

const rootReducer = combineReducers({
  transaction: transactionReducer,
  invoice: invoiceReducer,
});

export default rootReducer;
