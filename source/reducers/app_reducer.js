const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TEXT":
      return { ...state, initialText: "changed in the browser!" };
    case "ANDROID_REFRESH":
      return {
        ...state,
        ANDROID: { ...state.ANDROID, ANDROID_REFRESH: action.data.refresh },
      };
    default:
      return { ...state };
  }
};

export default appReducer;
