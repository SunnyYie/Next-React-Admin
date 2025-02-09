import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useSettings } from '../../../store/theme-setting'
import { HEADER_HEIGHT } from '../../config'
import Logo from '../../../components/logo'
import { ThemeLayout } from './type'
import { cn } from '../../../utils'

type Props = {
  collapsed: boolean
  onToggle: () => void
}
export default function NavLogo({ collapsed, onToggle }: Props) {
  const { themeLayout } = useSettings()

  return (
    <div style={{ height: `${HEADER_HEIGHT}px` }} className="relative flex items-center justify-center py-4">
      <div className="flex items-center">
        <Logo />
        {themeLayout !== ThemeLayout.Mini && (
          <span className="ml-2 text-xl font-bold text-primary">Next React Admin</span>
        )}
      </div>

      <div
        onClick={onToggle}
        onKeyDown={onToggle}
        className={cn(
          'absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none items-center justify-center rounded-full text-gray-400 text-center md:flex border border-dashed border-gray-50 text-sm bg-gray-50',
        )}
      >
        {collapsed ? (
          <RightOutlined className="text-xs text-text-disabled" />
        ) : (
          <LeftOutlined className="text-xs text-text-disabled" />
        )}
      </div>
    </div>
  )
}
