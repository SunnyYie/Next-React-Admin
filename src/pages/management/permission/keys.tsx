import permissionKeyService from '../../../api/services/management/permissionKeyService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import useToastConfirm from '../../../components/toast/useToastConfirm'
import PermissionKeyModal from './components/permissionKeyModal'
import { Button, message, Modal, Space, Table } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import AuthGuard from '../../../components/auth/authGuard'
import { PermissionKey } from '../../../store/type'
import { Navigate } from 'react-router'
import { useState } from 'react'
import RoleTag from '../../../components/tag/role-tag'
import CircleLoading from '../../../components/circle-loading'
import CombineSearch from '../../../components/combine-search'

type SearchParams = {
  name?: string
}

const SearchConfig = [{ name: 'name', label: '权限标识名', type: 'input' }]

export default function PermissionKeyPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allpermissionKeys'],
    queryFn: permissionKeyService.getAllPermissionKeys,
    staleTime: 1000 * 60 * 2,
  })

  const [editingPermissionKey, setEditingPermissionKeys] = useState<PermissionKey | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const queryClient = useQueryClient()

  // const showDeleteConfirm = useToastConfirm()

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
  // 搜索
  const searchPermissionKeyMutation = useMutation({
    mutationFn: permissionKeyService.getPermissionKeysByCondition,
  })
  const [searchData, setSearchData] = useState<PermissionKey[]>([])

  const handleAdd = () => {
    setEditingPermissionKeys(null)
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
            queryClient.invalidateQueries({ queryKey: ['allpermissionKeys'] })
          })
          .catch(() => {
            message.error('删除权限标识失败')
          })
      },
    })
  }

  const handleSearch = async (values: SearchParams) => {
    try {
      const data = await searchPermissionKeyMutation.mutateAsync(values)
      setSearchData(data)
    } catch (error) {
      message.error('搜索失败')
    }
  }

  const handleSave = async (values: PermissionKey) => {
    setIsModalVisible(false)

    try {
      if (editingPermissionKey) {
        await updatePermissionKeyMutation.mutateAsync({
          permissionId: editingPermissionKey.id,
          permissionKeyData: values,
        })
        message.success('权限标识已更新')
      } else {
        // 添加新权限
        const { roleId } = values
        delete values.roleId

        await createPermissionKeyMutation.mutateAsync({ roleId: String(roleId!), permissionKeyData: [values] })
        message.success('新权限标识已添加')
      }

      queryClient.invalidateQueries({ queryKey: ['allpermissionKeys'] })
    } catch (error) {
      message.error(editingPermissionKey ? '更新权限标识失败' : '添加权限标识失败')
    }
  }

  const columns = [
    {
      title: '权限标识',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '标识名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      key: 'roles',
      render: (_: any, record: PermissionKey) => (
        <Space size="middle">
          {record.RolePermissionKeys?.map(role => (
            <RoleTag key={role.id} role={role} />
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

  // if (isLoading || searchPermissionMutation.isPending) return <CircleLoading />
  if (isLoading) return <CircleLoading />
  if (isError || !data) return <Navigate to="/404" replace />

  return (
    <div>
      <AuthGuard permissionKeys="management:permissionKey:add">
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          添加权限标识
        </Button>
      </AuthGuard>

      <AuthGuard permissionKeys="management:permissionKey:search">
        <CombineSearch onSearch={handleSearch} config={SearchConfig} onReset={() => setSearchData([])} />
      </AuthGuard>

      <Table columns={columns} dataSource={searchData.length > 0 ? searchData : data} rowKey="id" />

      <PermissionKeyModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialValues={editingPermissionKey}
      />
    </div>
  )
}
