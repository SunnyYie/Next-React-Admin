import interfaceLogService from '../../../api/services/log/interfaceLogService'
import CombineSearch from '../../../components/combine-search'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Table, Button, Space, Modal, message } from 'antd'
import AuthGuard from '../../../components/auth/authGuard'
import { Navigate } from 'react-router'
import { SearchConfig } from './config'
import { InterfaceLog } from '../type'
import { useState } from 'react'
import RequestMethodTag from '../../../components/tag/request-method-tag'
import RequestStatusTag from '../../../components/tag/request-status-tag'

const { confirm } = Modal

type SearchParams = {
  url?: string
  os?: string
  referrer?: string
  method?: string
  status?: number
}

export default function InterfaceLogList() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['interfaceLogs'],
    queryFn: interfaceLogService.getAllInterfaceLogs,
  })

  // 删除
  const deleteRoleMutation = useMutation({
    mutationFn: interfaceLogService.deleteInterfaceLog,
  })

  // 搜索
  const searchLogMutation = useMutation({
    mutationFn: interfaceLogService.getInterfaceLogsByCondition,
  })
  const [searchData, setSearchData] = useState<InterfaceLog[]>([])

  const handleDelete = (id: string) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '您确定要删除这条日志吗?',
      onOk() {
        deleteRoleMutation
          .mutateAsync({ logId: id })
          .then(() => {
            message.success('日志已删除')
          })
          .catch(() => {
            message.error('删除日志失败')
          })
      },
    })
  }

  const handleSearch = async (values: SearchParams) => {
    try {
      const data = await searchLogMutation.mutateAsync(values)
      setSearchData(data)
    } catch (error) {
      message.error('搜索失败')
    }
  }

  const columns = [
    {
      title: '请求路径',
      key: 'url',
      dataIndex: 'url',
      ellipsis: true,
    },
    {
      title: '请求方法',
      key: 'method',
      render: (_: any, record: InterfaceLog) => <RequestMethodTag method={record.method} />,
    },
    {
      title: '请求参数',
      dataIndex: 'params',
      key: 'params',
      ellipsis: true,
    },
    {
      title: '状态',
      key: 'status',
      render: (_: any, record: InterfaceLog) => <RequestStatusTag status={record.status || 200} />,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      key: 'os',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: InterfaceLog) => (
        <Space size="middle">
          <AuthGuard permissionKeys="log:interfaceLog:delete">
            <Button onClick={() => handleDelete(record.id)} danger>
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
      <AuthGuard permissionKeys="log:interfaceLog:search">
        <CombineSearch onSearch={handleSearch} config={SearchConfig} onReset={() => setSearchData([])} />
      </AuthGuard>
      <Table columns={columns} dataSource={searchData.length > 0 ? searchData : data} rowKey="id" />
    </div>
  )
}
