import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";
import * as countActions from "./action";

@connect(
  state => ({ count: state.reduxComponentReducer.count }),
  dispatch => ({
    actions: bindActionCreators(countActions, dispatch)
  })
)
class ReduxComponentCount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { count } = this.props;
    return (
      <div>
        <p>{count}</p>
        <Button
          onClick={() => this.props.actions.reduceCount({ count: count - 2 })}
        >
          -
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.actions.addCount({ count: count + 2 })}
        >
          +
        </Button>
      </div>
    );
  }
}

export default ReduxComponentCount;
