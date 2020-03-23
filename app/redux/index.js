import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

const mapStateToProps = function(state) {
  return {
    message: "This is message from mapStateToProps",
    counter: state.counters
  };
};

export { store, mapStateToProps };
