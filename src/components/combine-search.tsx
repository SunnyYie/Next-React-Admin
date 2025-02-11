import { Form, Input, Select, Button, Space } from 'antd'
const { Option } = Select

export type CombineSearchConfig = {
  name: string
  label: string
  type: string
  options?: { label: any; value: any }[]
}

interface CombineSearchProps<T> {
  onSearch: (values: T) => void
  config: CombineSearchConfig[]
  onReset?: () => void
}

export default function CombineSearch<T>({ onSearch, config, onReset }: CombineSearchProps<T>) {
  const [form] = Form.useForm()

  const handleSearch = () => {
    form.validateFields().then(values => {
      onSearch(values)
    })
  }

  const handleReset = () => {
    if (onReset) {
      onReset()
    }
    form.resetFields()
  }

  return (
    <Form form={form} layout="inline" onFinish={handleSearch}>
      {/* 根据config生成表单项 */}
      {config.map(item => (
        <Form.Item key={item.name} name={item.name} label={item.label}>
          {item.type === 'input' ? (
            <Input placeholder={`请输入${item.label}`} />
          ) : (
            <Select placeholder={`请选择${item.label}`}>
              {item.options?.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
