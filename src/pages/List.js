import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Table, Input, Button } from "antd"
import * as listActions from "../actions/list"
import WorkSpeceFn from 'dlog'

let isDown = false
let startIndex = 0
let endIndex = 0
const data =
  "we're are groot,test demo.we are groot,test demo.we are groot,test demo.we are groot,test demo.we are groot,test demo.we are groot,test demo.we are groot,test demo.we are groot,test demo.we are groot,test demo"
@connect(
  state => ({
    list: state.listReducer.list,
    loading: state.listReducer.loading
  }),
  dispatch => ({
    actions: bindActionCreators(listActions, dispatch)
  })
)
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      arr: [],
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    this.props.actions.getList()
    const arr = WorkSpeceFn()
    console.log(arr)
    this.setState({
      arr: data.split("").map((item, index) => ({
        isSelect: false,
        content: item,
        key: index
      }))
    })
  }

  handleMouseDown(e) {
    isDown = true
    const spans = Array.from(document.querySelectorAll(".content-wrap > span"))
    startIndex = spans.indexOf(e.target)
  }

  handleMouseUp() {
    isDown = false
    let maxIndex = startIndex > endIndex ? startIndex : endIndex
    let minIndex = startIndex > endIndex ? endIndex : startIndex
    const { arr } = this.state
    while (
      data[minIndex - 1] &&
      data[minIndex - 1] !== " " &&
      data[minIndex - 1] !== "," &&
      data[minIndex - 1] !== "." &&
      data[minIndex - 1] !== "?" &&
      data[minIndex - 1] !== "!" &&
      data[minIndex - 1] !== "..."
    ) {
      minIndex--
    }
    while (
      data[maxIndex + 1] &&
      data[maxIndex + 1] !== " " &&
      data[maxIndex + 1] !== "," &&
      data[maxIndex + 1] !== "." &&
      data[maxIndex + 1] !== "?" &&
      data[maxIndex + 1] !== "!" &&
      data[maxIndex + 1] !== "..."
    ) {
      maxIndex++
    }
    console.log(minIndex, maxIndex)
    const newArr = arr.map((item, index) => {
      if (index <= maxIndex && index >= minIndex) {
        return {
          ...item,
          isSelect: true
        }
      }
      return {
        ...item,
        isSelect: false
      }
    })
    const lastSpan = document.querySelectorAll(".content-wrap > span")[maxIndex]
    if (window.innerHeight - lastSpan.getBoundingClientRect().top < 300) {
      window.scrollTo(0, window.scrollY + 100)
    }
    this.setState({
      arr: newArr,
      visible: true,
      top: lastSpan.getBoundingClientRect().top + window.scrollY + 10,
      left: lastSpan.getBoundingClientRect().left - 10
    })
  }

  handleMouseEnter(index) {
    if (!isDown) return
    const { arr } = this.state
    const maxIndex = startIndex > index ? startIndex : index
    const minIndex = startIndex > index ? index : startIndex
    endIndex = index
    const newArr = arr.map((item, index) => {
      if (index <= maxIndex && index >= minIndex) {
        return {
          ...item,
          isSelect: true
        }
      }
      return {
        ...item,
        isSelect: false
      }
    })
    this.setState({
      arr: newArr
    })
  }

  handleHideModal() {
    const { arr } = this.state
    const newArr = arr.map(item => ({
      ...item,
      isSelect: false
    }))
    this.setState({
      arr: newArr,
      visible: false
    })
  }

  render() {
    const { list, loading } = this.props
    const { visible, arr, left, top } = this.state
    const columns = [
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
        render: (text, record) => {
          return <span>{text}</span>
        }
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Account",
        dataIndex: "account",
        key: "account"
      }
    ]
    return (
      <div>
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}
          loading={loading}
          rowKey="id"
        />
        <p>123</p>
        <p>456</p>
        <p>789</p>
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}
          loading={loading}
          rowKey="id"
        />
        <div
          onMouseDown={e => this.handleMouseDown(e)}
          onMouseUp={() => this.handleMouseUp()}
          style={{ userSelect: "none", marginBottom: 300 }}
          className="content-wrap"
        >
          {arr.map(item => {
            return (
              <span
                key={item.key}
                onMouseMove={() => this.handleMouseEnter(item.key)}
                className={item.isSelect ? "select-unit" : ""}
              >
                {item.content}
              </span>
            )
          })}
        </div>
        {visible && (
          <React.Fragment>
            <div className="mask" onClick={() => this.handleHideModal()} />
            <div className="option-modal" style={{ left, top }}>
              <Input />
              <Button>确定</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default List
