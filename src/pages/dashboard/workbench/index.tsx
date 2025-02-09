import { useUserPermissionKeys } from '../../../store/user-setting'
import AuthGuard from '../../../components/auth/authGuard'
import { Button } from 'antd'

export default function Workbench() {
  const permissionKeys = useUserPermissionKeys()

  return <div>Workbench</div>
}
