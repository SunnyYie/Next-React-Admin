import { Button } from 'antd'
import AuthGuard from '../../../components/auth/authGuard'
import { useUserPermissionKeys } from '../../../store/user-setting'

export default function Workbench() {
  const permissionKeys = useUserPermissionKeys()

  return (
    <div>
      Workbench
      <AuthGuard permissionKeys="workbench:user:add">
        <Button>新建</Button>
      </AuthGuard>
      <Button disabled={permissionKeys?.findIndex(item => item.label === 'workbench:user:edit') !== -1}>编辑</Button>
    </div>
  )
}
