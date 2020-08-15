import React from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import appActions from "../actions/app_actions";

// import "./landing.scss";
import styles from "./landing.module.scss";

console.log(styles);

const Landing = ({ initialText, appActions }) => {
  return (
    <div>
      <p className={styles.appcontainer}>{initialText}</p>
      <button
        className={styles.buttonx}
        onClick={() => appActions.setTextInBrowser()}
      >
        dup textsss!
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Landing);
