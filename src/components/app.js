import React from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import appActions from "../actions/app_actions";

import "./app.scss";

const App = ({ initialText, appActions }) => {
  return (
    <div>
      <p>{initialText}</p>
      <button onClick={() => appActions.setTextInBrowser()}>
        change text!
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    initialText: state.initialText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // appActions: bindActionCreators(appActions, dispatch),
    appActions: {
      setTextInBrowser: () => {
        dispatch({
          type: "CHANGE_TEXT",
          data: {
            initialText: "Client",
          },
        });
      },
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
