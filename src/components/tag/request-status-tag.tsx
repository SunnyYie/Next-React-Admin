import { Tag } from 'antd'

interface RequestStatusTagProps {
  status: number
}

export default function RequestStatusTag({ status }: RequestStatusTagProps) {
  switch (status) {
    // 如果是2开头
    case 200:
      return <Tag color="green">{status}</Tag>
    // 如果是3开头
    case 304:
      return <Tag color="blue">{status}</Tag>
    // 如果是4开头
    case 404:
      return <Tag color="red">{status}</Tag>
    case 500:
      return <Tag color="red">{status}</Tag>
    default:
      return <Tag color="blue">{status}</Tag>
  }
}
