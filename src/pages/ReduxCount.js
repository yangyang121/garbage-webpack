import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Button } from "antd"
import * as countActions from "../actions/count"

@connect(
  state => ({
    count: state.countReducer.count
  }),
  dispatch => ({
    actions: bindActionCreators(countActions, dispatch)
  })
)
class ReduxCount extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { count } = this.props
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
      </div>
    )
  }
}

export default ReduxCount
