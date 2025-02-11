import { Role } from '../../../../store/type'
import { Modal, Form, Input } from 'antd'
import { useEffect } from 'react'

interface RoleFormProps {
  visible: boolean
  onCancel: () => void
  onSave: (values: Role) => void
  initialValues?: Role | null
}

export default function RoleModal({ visible, onCancel, onSave, initialValues }: RoleFormProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [visible, initialValues, form])

  const handleOk = () => {
    form.validateFields().then(values => {
      onSave(values)
      // form.resetFields()
    })
  }

  return (
    <Modal
      title={initialValues ? '编辑角色' : '添加角色'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="保存"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="角色标识" rules={[{ required: true, message: '请输入用户标识' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="角色描述" rules={[{ required: true, message: '请输入用户描述' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
