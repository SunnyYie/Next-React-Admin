import { Table, Button, Space, Modal, message, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import userService from '../../../api/services/userService'
import { Navigate, useNavigate } from 'react-router'
import UserModal from './components/userModal'
import { UserInfo } from '../../../store/type'
import { useState } from 'react'
import AuthGuard from '../../../components/auth/authGuard'
import CombineSearch from '../../../components/combine-search'

const { confirm } = Modal

type SearchParams = {
  name?: string
  email?: string
}

const SearchConfig = [
  { name: 'name', label: '用户名', type: 'input' },
  { name: 'email', label: '邮箱', type: 'input' },
]

export default function UserList() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })

  const queryClient = useQueryClient()

  // 新增
  const createUserMutation = useMutation({
    mutationFn: userService.createUser,
  })
  // 修改
  const updateUserMutation = useMutation({
    mutationFn: userService.updateUser,
  })
  // 删除
  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
  })
  // 搜索
  const searchUserMutation = useMutation({
    mutationFn: userService.searchUser,
  })
  const [searchData, setSearchData] = useState<UserInfo[]>([])

  const navigate = useNavigate()

  const [isFormModalVisible, setIsFormModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<UserInfo | null>(null)

  const handleAdd = () => {
    setEditingUser(null)
    setIsFormModalVisible(true)
  }

  const handleEdit = (record: UserInfo) => {
    setEditingUser(record)
    setIsFormModalVisible(true)
  }

  const handleSearch = async (values: SearchParams) => {
    try {
      const data = await searchUserMutation.mutateAsync(values)
      setSearchData(data)
    } catch (error) {
      message.error('搜索失败')
    }
  }

  const handleDelete = (id: string) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除这个用户吗?',
      onOk() {
        deleteUserMutation
          .mutateAsync({ id })
          .then(() => {
            message.success('用户已删除')
            queryClient.invalidateQueries({ queryKey: ['users'] })
          })
          .catch(() => {
            message.error('删除用户失败')
          })
      },
    })
  }

  const handleViewDetails = (record: UserInfo) => {
    navigate(`/management/user/${record.id}`)
  }

  const handleSave = async (values: UserInfo) => {
    try {
      if (editingUser) {
        // 编辑现有用户
        await updateUserMutation.mutateAsync({ id: editingUser.id, data: values })
        message.success('用户信息已更新')
      } else {
        // 添加新用户
        await createUserMutation.mutateAsync(values)
        message.success('新用户已添加')
      }
      setIsFormModalVisible(false)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    } catch (error) {
      message.error('新增用户失败')
      console.error('新增用户失败:', error)
    }
  }

  const columns = [
    {
      title: '头像',
      key: 'avatar',
      render: (_: any, record: UserInfo) => {
        if (record.avatar) {
          return <img src={record.avatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        }

        return (
          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#f0f0f0' }}>
            <span
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
            >
              {record.name?.charAt(0) || '孙'}
            </span>
          </div>
        )
      },
    },
    {
      title: '姓名',
      key: 'name',
      render: (_: any, record: UserInfo) => <span>{record.name ? record.name : 'user'}</span>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      key: 'role',
      render: (_: any, record: UserInfo) => (
        <Space size="middle">
          <Tag color={record.role?.id == '1' ? 'green' : 'blue'}>{record.role?.description}</Tag>
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserInfo) => (
        <Space size="middle">
          <AuthGuard permissionKeys="management:user:detail">
            <Button onClick={() => handleViewDetails(record)}>查看</Button>
          </AuthGuard>
          <AuthGuard permissionKeys="management:user:edit">
            <Button onClick={() => handleEdit(record)}>编辑</Button>
          </AuthGuard>
          <AuthGuard permissionKeys="management:user:delete">
            <Button danger onClick={() => handleDelete(record.id)}>
              删除
            </Button>
          </AuthGuard>
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
      <AuthGuard permissionKeys="management:user:add">
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          添加用户
        </Button>
      </AuthGuard>

      <AuthGuard permissionKeys="management:user:search">
        <CombineSearch onSearch={handleSearch} config={SearchConfig} onReset={() => setSearchData([])} />
      </AuthGuard>

      <Table columns={columns} dataSource={searchData.length > 0 ? searchData : data} rowKey="id" />

      <UserModal
        visible={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        onSave={handleSave}
        initialValues={editingUser}
      />
    </div>
  )
}
