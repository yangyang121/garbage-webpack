import React, { useState, useCallback } from "react"
import { Modal, Form, Select, Button, Input } from "antd"

const { Option } = Select
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const arr = ["crm", "om", "ol", "incentive"]

const request = function (params: { note: string; gender: string[] }) {
  return Promise.resolve(params)
}

function Home() {
  const [form] = Form.useForm()
  const { validateFields, setFields } = form
  const [visible, setVisible] = useState(false)

  const handleConfirm = useCallback(async () => {
    const values = await validateFields()
    const res = await request(values)
    console.log(res)
    if (res.gender.includes("incentive")) {
      setFields([{ name: "note", errors: ["rename"] }])
    }
  }, [validateFields, setFields])

  return (
    <div>
      <Button onClick={() => setVisible(true)}>click</Button>
      <Modal visible={visible} onOk={handleConfirm} title="test">
        <Form {...layout} form={form} name="control-hooks" requiredMark={false}>
          <Form.Item
            name="note"
            label="Note"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value || !value.trim()) {
                    return Promise.reject(new Error("enter"))
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "asda" }]}
          >
            <Select mode="multiple" allowClear>
              {arr.map((v) => (
                <Option value={v} key={v}>
                  {v}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Home
