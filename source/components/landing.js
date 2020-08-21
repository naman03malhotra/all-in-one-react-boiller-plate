import React from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import appActions from "../actions/app_actions";

import "./landing.scss";

const Landing = ({ initialText, appActions, ANDROID }) => {
  function jsCallback() {
    console.log("Android cb called", JSON.stringify(ANDROID));
    ANDROID.ANDROID_ENV && ANDROID.ANDROID_TRIGGERS.setRefresh();
    appActions.setRefresh();
  }

  return (
    <div>
      <p className="app-container">
        {initialText} android ref {JSON.stringify(ANDROID.ANDROID_REFRESH)}
      </p>
      <button
        className="button-x"
        // onClick={() => appActions.setTextInBrowser()}
        onClick={() => jsCallback()}
      >
        dup textx!asds akjs
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  console.log(JSON.stringify(state));
  return {
    initialText: state.initialText,
    ANDROID: state.ANDROID,
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

      setRefresh: () => {
        dispatch({
          type: "ANDROID_REFRESH",
          data: {
            refresh: false,
          },
        });
      },
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Landing);
