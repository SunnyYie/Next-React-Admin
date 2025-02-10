import permissionKeyService from '../../../api/services/management/permissionKeyService'
import PermissionKeyModal from './components/permissionKeyModal'
import { Button, message, Modal, Space, Table, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PermissionKey } from '../../../store/type'
import { Navigate } from 'react-router'
import { useState } from 'react'
import AuthGuard from '../../../components/auth/authGuard'

export default function PermissionKeyPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allpermissionKeys'],
    queryFn: permissionKeyService.getAllPermissionKeys,
  })

  const [editingPermissionKey, setEditingPermissionKeys] = useState<PermissionKey | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // 新增
  const createPermissionKeyMutation = useMutation({
    mutationFn: permissionKeyService.createPermissionKey,
  })
  // 修改
  const updatePermissionKeyMutation = useMutation({
    mutationFn: permissionKeyService.updatePermissionKey,
  })
  // 删除
  const deletePermissionKeyMutation = useMutation({
    mutationFn: permissionKeyService.deletePermissionKey,
  })

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleEdit = (record: PermissionKey) => {
    setEditingPermissionKeys(record)
    setIsModalVisible(true)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除这个权限标识吗?',
      onOk() {
        deletePermissionKeyMutation
          .mutateAsync({ permissionId: id })
          .then(() => {
            message.success('权限标识已删除')
          })
          .catch(() => {
            message.error('删除权限标识失败')
          })
      },
    })
  }

  const handleSave = async (values: PermissionKey) => {
    try {
      if (editingPermissionKey) {
        await updatePermissionKeyMutation.mutateAsync({ permissionId: editingPermissionKey.id, permissionData: values })
        message.success('权限标识已更新')
      } else {
        // 添加新权限
        await createPermissionKeyMutation.mutateAsync({ roleId: '1', permissionData: [values] })
        message.success('新权限标识已添加')
      }
    } catch (error) {
      message.error(editingPermissionKey ? '更新权限标识失败' : '添加权限标识失败')
    } finally {
      setIsModalVisible(false)
    }
  }

  const columns = [
    {
      title: '权限标识',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '角色',
      key: 'roles',
      render: (_: any, record: PermissionKey) => (
        <Space size="middle">
          {record.RolePermissionKeys?.map(role => (
            <Tag color={role.roleId == '1' ? 'green' : 'blue'} key={role.id}>
              {role.roleId == '1' ? '管理员' : '用户'}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PermissionKey) => (
        <Space size="middle">
          <AuthGuard permissionKeys="management:permissionKey:edit">
            <Button onClick={() => handleEdit(record)}>编辑</Button>
          </AuthGuard>
          <AuthGuard permissionKeys="management:permissionKey:delete">
            <Button onClick={() => handleDelete(record.id)} danger>
              删除
            </Button>
          </AuthGuard>
        </Space>
      ),
    },
  ]

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <Navigate to="/404" replace />

  return (
    <div>
      <AuthGuard permissionKeys="management:permissionKey:add">
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          添加权限
        </Button>
      </AuthGuard>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <PermissionKeyModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialValues={editingPermissionKey}
      />
    </div>
  )
}
