import { useSettings } from '../../../store/theme-setting'
import { ThemeLayout } from './type'

import NavHorizontal from './nav-horizontal'
import NavVertical from './nav-vertical'

export default function Nav() {
  const { themeLayout } = useSettings()
  if (themeLayout === ThemeLayout.Horizontal) return <NavHorizontal />
  if (themeLayout === ThemeLayout.Vertical) return <NavVertical />

  return null
}
