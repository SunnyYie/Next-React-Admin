import { Breadcrumb } from '@arco-design/web-react'
import { useLocation } from '@tanstack/react-router'

export default function BreadCrumb() {
  const location = useLocation()

  // 将路径拆分为数组，并过滤掉空字符串
  const pathSegments = location.pathname.split('/').filter(segment => segment)

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {pathSegments.map((segment, index) => {
        // 生成每个面包屑项的路径
        const path = '/' + pathSegments.slice(0, index + 1).join('/')
        return (
          <Breadcrumb.Item key={path} href={path}>
            {segment}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
