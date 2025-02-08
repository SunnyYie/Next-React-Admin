import { useUserPermissionKeys } from '../../store/user-setting'
import { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  permissionKeys: string | string[]
}

export default function AuthGuard({ children, permissionKeys }: AuthGuardProps) {
  const userPermissionKeys = useUserPermissionKeys()

  if (!userPermissionKeys) return null

  // 判断当前用户是否有权限
  if (Array.isArray(permissionKeys)) {
    const hasPermission = permissionKeys.every(key => userPermissionKeys.findIndex(item => item.label === key) !== -1)
    return hasPermission ? <>{children}</> : null
  } else {
    const hasPermission = userPermissionKeys.findIndex(item => item.label === permissionKeys) !== -1
    return hasPermission ? <>{children}</> : null
  }
}
