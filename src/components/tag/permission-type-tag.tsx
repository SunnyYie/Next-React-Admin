import { PermissionType } from '../../router/type'
import { Tag } from 'antd'

interface PermissionTypeTagProps {
  type: PermissionType
}

export default function PermissionTypeTag({ type }: PermissionTypeTagProps) {
  return (
    <Tag color={type === PermissionType.catalogue ? 'blue' : type === PermissionType.MENU ? 'green' : 'orange'}>
      {type}
    </Tag>
  )
}
