import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";
import * as countActions from "../actions/count";
import ReduxComponent from "../components/reduxComponent";

@connect(
  state => ({
    count: state.countReducer.count,
    componentCount: state.reduxComponentReducer.count
  }),
  dispatch => ({
    actions: bindActionCreators(countActions, dispatch)
  })
)
class ReduxCount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { count, componentCount } = this.props;
    return (
      <div>
        <p>{count}</p>
        <Button
          onClick={() => this.props.actions.addCount({ count: count - 1 })}
        >
          -
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.actions.addCount({ count: count + 1 })}
        >
          +
        </Button>
        <hr />
        <ReduxComponent />
      </div>
    );
  }
}

export default ReduxCount;
