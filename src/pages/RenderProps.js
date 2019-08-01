import React from "react"

const Bar = ({ title }) => <p>{title}</p>

class Foo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "This is Foos title"
    }
  }

  render() {
    const { title } = this.state
    const { renderProps } = this.state
    return <div>{renderProps(title)}</div>
  }
}

export default class Baz extends React.Component {
  render() {
    return <Foo renderProps={title => <Bar title={title} />} />
  }
}
