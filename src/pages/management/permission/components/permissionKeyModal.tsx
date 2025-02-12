import { PermissionKey } from '../../../../store/type'
import { Modal, Form, Input, Select } from 'antd'
import { Role } from '../../../../router/type'
import { useEffect } from 'react'

interface PermissionModalProps {
  visible: boolean
  onCancel: () => void
  onSave: (values: PermissionKey) => void
  initialValues?: PermissionKey | null
}

export default function PermissionKeyModal({ visible, onCancel, onSave, initialValues }: PermissionModalProps) {
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
      form.resetFields()
    })
  }

  return (
    <Modal
      title={initialValues ? '编辑权限' : '添加权限'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="保存"
    >
      <Form form={form} layout="vertical">
        {/* 关联角色 */}
        <Form.Item name="roleId" label="关联角色" rules={[{ required: true, message: '请选择关联角色' }]}>
          <Select defaultValue={Role.USER}>
            <Select.Option value={Role.AMDIN}>管理员</Select.Option>
            <Select.Option value={Role.USER}>普通用户</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="label" label="权限标识" rules={[{ required: true, message: '请输入权限标识' }]}>
          <Input placeholder="xxx:xxx:add" />
        </Form.Item>
        <Form.Item name="name" label="标识名" rules={[{ required: true, message: '请输入标识名' }]}>
          <Input placeholder="请输入标识名" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
