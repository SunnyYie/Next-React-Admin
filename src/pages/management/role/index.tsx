import roleService from '../../../api/services/management/roleService'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Table, Button, Space, Modal, message } from 'antd'
import RoleModal from './components/roleModal'
import { Role } from '../../../store/type'
import { Navigate } from 'react-router'
import { useState } from 'react'

const { confirm } = Modal

export default function UserList() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: roleService.getAllRoles,
  })

  // 新增
  const createRoleMutation = useMutation({
    mutationFn: roleService.createRole,
  })
  // 修改
  const updateRoleMutation = useMutation({
    mutationFn: roleService.updateRole,
  })
  // 删除
  const deleteRoleMutation = useMutation({
    mutationFn: roleService.deleteRole,
  })

  const [isFormModalVisible, setIsFormModalVisible] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const handleAdd = () => {
    setEditingRole(null)
    setIsFormModalVisible(true)
  }

  const handleEdit = (record: Role) => {
    setEditingRole(record)
    setIsFormModalVisible(true)
  }

  const handleDelete = (id: string) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除这个角色吗?',
      onOk() {
        deleteRoleMutation
          .mutateAsync({ roleId: id })
          .then(() => {
            message.success('角色已删除')
          })
          .catch(() => {
            message.error('删除角色失败')
          })
      },
    })
  }

  const handleSave = async (values: Role) => {
    if (editingRole) {
      // 编辑现有角色
      await updateRoleMutation.mutateAsync({ roleId: editingRole.id, data: values })
      message.success('角色信息已更新')
    } else {
      // 添加新角色
      await createRoleMutation.mutateAsync(values)
      message.success('新角色已添加')
    }
    setIsFormModalVisible(false)
  }

  const columns = [
    {
      title: '角色标识',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Role) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <Navigate to="/404" replace />
  }

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        添加角色
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <RoleModal
        visible={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        onSave={handleSave}
        initialValues={editingRole}
      />
    </div>
  )
}
