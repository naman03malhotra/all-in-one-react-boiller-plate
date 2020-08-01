const appActions = {
  setTextInBrowser() {
    return (dispatch) => {
      dispatch({
        type: "CHANGE_TEXT",
        data: {
          initialText: "Client",
        },
      });
    };
  },
};

export default appActions;
