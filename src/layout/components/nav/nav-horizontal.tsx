import { usePermissionRoutes } from '../../../router/hooks/use-permission-routes'
import { useRouteToMenuFn } from '../../../router/hooks/use-route-to-menu'
import { NAV_HORIZONTAL_HEIGHT } from '../../config'
import { menuFilter } from '../../../router/utils'
import { Menu, type MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useMemo } from 'react'

export default function NavHorizontal() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const routeToMenuFn = useRouteToMenuFn()
  const permissionRoutes = usePermissionRoutes()

  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes)
    return routeToMenuFn(menuRoutes)
  }, [routeToMenuFn, permissionRoutes])

  const selectedKeys = useMemo(() => [pathname], [pathname])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        defaultOpenKeys={[]}
        selectedKeys={selectedKeys}
        onClick={onClick}
        className="!border-none"
      />
    </div>
  )
}
