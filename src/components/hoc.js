import React, { PureComponent } from "react"

const dataSource = [
  { id: 1, text: "how", subject: 1 },
  { id: 2, text: "2*3=6", subject: 2 },
  { id: 3, text: "what", subject: 1 },
  { id: 4, text: "3*4=12", subject: 2 }
]

export default function hoc(WarppedComponent, ...opts) {
  const subject = opts[0] || 1
  return class extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        title: "this is a title"
      }
    }

    handleChangeTitle = title => this.setState({ title })

    render() {
      const { title } = this.state
      return (
        <div>
          <h2>{title}</h2>
          <WarppedComponent
            data={dataSource.filter(data => data.subject === subject)}
            handleChangeTitle={this.handleChangeTitle}
          />
        </div>
      )
    }
  }
}
