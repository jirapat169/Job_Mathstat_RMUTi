export const mapStateToProps = function(state) {
  return {
    message: "This is message from mapStateToProps",
    counter: state.counters
  };
};
