import { Tag } from 'antd'

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ALL = 'ALL',
}

interface RequestMethodTagProps {
  method: string
}

export default function RequestMethodTag({ method }: RequestMethodTagProps) {
  switch (method) {
    case RequestMethod.GET:
      return <Tag color="blue">{method}</Tag>
    case RequestMethod.POST:
      return <Tag color="green">{method}</Tag>
    case RequestMethod.PUT:
      return <Tag color="orange">{method}</Tag>
    case RequestMethod.DELETE:
      return <Tag color="red">{method}</Tag>
    default:
      return <Tag color="purple">{method}</Tag>
  }
}
