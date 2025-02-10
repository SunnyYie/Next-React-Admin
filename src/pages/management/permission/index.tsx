import permissionService from '../../../api/services/management/permissionService'
import { Permission, PermissionType } from '../../../router/type'
import { Button, message, Modal, Space, Table, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import PermissionModal from './components/permissionModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router'
import { useState } from 'react'

export default function PermissionPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allpermissions'],
    queryFn: permissionService.getAllPermissions,
  })

  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // 新增
  const createPermissionMutation = useMutation({
    mutationFn: permissionService.createPermission,
  })
  // 修改
  const updatePermissionMutation = useMutation({
    mutationFn: permissionService.updatePermission,
  })
  // 删除
  const deletePermissionMutation = useMutation({
    mutationFn: permissionService.deletePermission,
  })

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleEdit = (record: Permission) => {
    setEditingPermission(record)
    setIsModalVisible(true)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除这个权限吗?',
      onOk() {
        deletePermissionMutation
          .mutateAsync({ permissionId: id })
          .then(() => {
            message.success('权限已删除')
          })
          .catch(() => {
            message.error('删除权限失败')
          })
      },
    })
  }

  const handleSave = async (values: Permission) => {
    try {
      if (editingPermission) {
        await updatePermissionMutation.mutateAsync({ permissionId: editingPermission.id, permissionData: values })
        message.success('权限已更新')
      } else {
        // 添加新权限
        await createPermissionMutation.mutateAsync({ roleId: '1', permissionData: [values] })
        message.success('新权限已添加')
      }
    } catch (error) {
      message.error(editingPermission ? '更新权限失败' : '添加权限失败')
    } finally {
      setIsModalVisible(false)
    }
  }

  const columns = [
    {
      title: '权限名称',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '角色',
      key: 'roles',
      render: (_: any, record: Permission) => (
        <Space size="middle">
          {record.roles?.map(role => (
            <Tag color={role.roleId == '1' ? 'green' : 'blue'} key={role.id}>
              {role.roleId == '1' ? '管理员' : '用户'}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '类型',
      key: 'type',
      render: (_: any, record: Permission) => (
        <Tag
          color={
            record.type === PermissionType.catalogue ? 'blue' : record.type === PermissionType.MENU ? 'green' : 'orange'
          }
        >
          {record.type}
        </Tag>
      ),
    },
    {
      title: '路由',
      key: 'route',
      render: (_: any, record: Permission) => <span>{`/${record.route}`}</span>,
    },
    {
      title: '组件',
      key: 'component',
      render: (_: any, record: Permission) => <span>{record.component}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Permission) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>编辑</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <Navigate to="/404" replace />

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        添加权限
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <PermissionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialValues={editingPermission}
      />
    </div>
  )
}
