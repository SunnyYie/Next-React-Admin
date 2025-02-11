import userService from '../../../api/services/userService'
import { Navigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Button, Descriptions } from 'antd'

export default function UserDetail() {
  // 通过路由获取用户ID
  const { id } = useParams()

  if (!id) return <Navigate to="/404" replace />

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserDetail(id),
  })

  if (isLoading) return <div>loading...</div>

  if (isError || !data) return <Navigate to="/404" replace />

  return (
    <>
      {/* 返回 */}
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => window.history.back()}>返回</Button>
      </div>

      <Descriptions column={1} title="用户详情">
        <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
        <Descriptions.Item label="头像">
          {data.avatar ? (
            <img src={data.avatar} alt="avatar" style={{ width: 100 }} />
          ) : (
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#f0f0f0' }}>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                {data.name?.charAt(0) || '孙'}
              </span>
            </div>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="姓名">{data.name || 'user'}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
        <Descriptions.Item label="角色">{data.role?.description}</Descriptions.Item>
      </Descriptions>
    </>
  )
}
