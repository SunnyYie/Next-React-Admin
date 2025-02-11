import { Permission, PermissionType, Role } from '../../../../router/type'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import { Modal, Form, Input, Radio, Select, InputNumber } from 'antd'
import { useEffect } from 'react'

interface PermissionModalProps {
  visible: boolean
  onCancel: () => void
  onSave: (values: Permission) => void
  initialValues?: Permission | null
}

const permissionTypeOptions: CheckboxGroupProps<string>['options'] = [
  { label: PermissionType.catalogue, value: '0' },
  { label: PermissionType.menu, value: '1' },
]

const hideOptions: CheckboxGroupProps<boolean>['options'] = [
  { label: '是', value: true },
  { label: '否', value: false },
]

export default function PermissionForm({ visible, onCancel, onSave, initialValues }: PermissionModalProps) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields().then(values => {
      onSave(values)
      form.resetFields()
    })
  }

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        type: String(initialValues.type == PermissionType.catalogue ? '0' : '1'),
        roleId: initialValues.roles?.at(0)?.roleId == '1' ? Role.AMDIN : Role.USER,
      })
    } else {
      form.resetFields()
    }
  }, [visible, initialValues, form])

  return (
    <Modal
      title={initialValues ? '编辑权限' : '添加权限'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="保存"
      className="flex min-w-[600px] h-[80vh] flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <Form
          form={form}
          layout="vertical"
          initialValues={{ type: String(initialValues?.type || PermissionType.MENU) }}
        >
          {/* 权限类型 */}
          <Form.Item name="type" label="权限类型" rules={[{ required: true, message: '请选择权限类型' }]}>
            <Radio.Group
              defaultValue={String(PermissionType.MENU)}
              buttonStyle="solid"
              optionType="button"
              options={permissionTypeOptions}
              block
            />
          </Form.Item>
          {/* 关联角色 */}
          <Form.Item name="roleId" label="关联角色" rules={[{ required: true, message: '请选择关联角色' }]}>
            <Select defaultValue={Role.USER}>
              <Select.Option value={Role.AMDIN}>管理员</Select.Option>
              <Select.Option value={Role.USER}>普通用户</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="label" label="权限标识" rules={[{ required: true, message: '请输入权限标识' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="权限名称" rules={[{ required: true, message: '请输入权限名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="route" label="权限路由" rules={[{ required: true, message: '请输入权限路由' }]}>
            <Input placeholder="routePath" />
          </Form.Item>

          <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
            {({ getFieldValue }) => {
              const type = getFieldValue('type')
              if (type == String(PermissionType.CATALOGUE)) {
                return (
                  <>
                    <Form.Item name="order" label="排序" rules={[{ required: true, message: '请输入排序' }]}>
                      <InputNumber defaultValue={1} />
                    </Form.Item>
                    <Form.Item name="icon" label="图标" rules={[{ required: true, message: '请输入图标' }]}>
                      <Input placeholder="图标名格式为:icon-[dir]-[name]" />
                    </Form.Item>
                  </>
                )
              }
              if (type == String(PermissionType.MENU)) {
                return (
                  <>
                    <Form.Item name="component" label="组件" rules={[{ required: true, message: '请输入组件' }]}>
                      <Input placeholder="请输入组件路径" />
                    </Form.Item>
                    <Form.Item name="parentId" label="parentId" rules={[{ required: true, message: '请输入父ID' }]}>
                      {/* Todo:展示树结构的下拉选择框 */}
                      <Input />
                    </Form.Item>
                  </>
                )
              }
              return null
            }}
          </Form.Item>

          <Form.Item name="hide" label="是否隐藏">
            <Radio.Group options={hideOptions} defaultValue={false} />
          </Form.Item>
          <Form.Item name="hideInMenu" label="是否隐藏菜单项">
            <Radio.Group options={hideOptions} defaultValue={false} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
