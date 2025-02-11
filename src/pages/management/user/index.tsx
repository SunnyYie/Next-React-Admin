import { Table, Button, Space, Modal, message, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import userService from '../../../api/services/userService'
import { Navigate, useNavigate } from 'react-router'
import UserModal from './components/userModal'
import { UserInfo } from '../../../store/type'
import { useState } from 'react'

const { confirm } = Modal

export default function UserList() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })

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
          <Button onClick={() => handleViewDetails(record)}>查看</Button>
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
        添加用户
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />

      <UserModal
        visible={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        onSave={handleSave}
        initialValues={editingUser}
      />
    </div>
  )
}
