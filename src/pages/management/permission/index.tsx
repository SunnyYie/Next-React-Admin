import permissionService from '../../../api/services/management/permissionService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Permission, PermissionType } from '../../../router/type'
import { Button, message, Modal, Space, Table, Tag } from 'antd'
import CombineSearch from '../../../components/combine-search'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import PermissionModal from './components/permissionModal'
import AuthGuard from '../../../components/auth/authGuard'
import { Navigate } from 'react-router'
import { useState } from 'react'

export type SearchParams = {
  name?: string
  type?: PermissionType
}

const permissionTypeOptions = [
  { label: PermissionType.catalogue, value: PermissionType.catalogue },
  { label: PermissionType.menu, value: PermissionType.menu },
]

const SearchConfig = [
  { name: 'label', label: '权限名称', type: 'input' },
  { name: 'type', label: '类型', type: 'select', options: permissionTypeOptions },
]

export default function PermissionPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allpermissions'],
    queryFn: permissionService.getAllPermissions,
    staleTime: 1000 * 60 * 2,
  })

  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const queryClient = useQueryClient()

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
  // 搜索
  const searchPermissionMutation = useMutation({
    mutationFn: permissionService.getPermissionsByCondition,
  })
  const [searchData, setSearchData] = useState<Permission[]>([])

  const handleAdd = () => {
    setEditingPermission(null)
    setIsModalVisible(true)
  }

  const handleEdit = (record: Permission) => {
    setEditingPermission(record)
    setIsModalVisible(true)
  }

  const handleSearch = async (values: SearchParams) => {
    try {
      const data = await searchPermissionMutation.mutateAsync(values)
      setSearchData(data)
    } catch (error) {
      message.error('搜索失败')
    }
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
            queryClient.invalidateQueries({ queryKey: ['allpermissions'] })
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

      queryClient.invalidateQueries({ queryKey: ['allpermissions'] })
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
          <AuthGuard permissionKeys="management:permission:edit">
            <Button onClick={() => handleEdit(record)}>编辑</Button>
          </AuthGuard>

          <AuthGuard permissionKeys="management:permission:delete">
            <Button danger onClick={() => handleDelete(record.id)}>
              删除
            </Button>
          </AuthGuard>
        </Space>
      ),
    },
  ]

  if (isLoading || searchPermissionMutation.isPending) return <div>Loading...</div>
  if (isError || !data) return <Navigate to="/404" replace />

  return (
    <div>
      <AuthGuard permissionKeys="management:permission:add">
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          添加权限
        </Button>
      </AuthGuard>

      <CombineSearch onSearch={handleSearch} config={SearchConfig} onReset={() => setSearchData([])} />

      <Table columns={columns} dataSource={searchData.length > 0 ? searchData : data} rowKey="id" />

      <PermissionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialValues={editingPermission}
      />
    </div>
  )
}
