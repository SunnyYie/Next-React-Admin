import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH } from '../config'
import { useSettings } from '../../store/theme-setting'
import { type CSSProperties, useState } from 'react'
import { ThemeLayout } from './nav/type'
import { cn } from '../../utils'
import { Drawer } from 'antd'

import { IconButton, Iconify, SvgIcon } from '../../components/icon'

import AccountDropdown from './account-dropdown'
import SettingButton from './setting-button'
import NavVertical from './nav/nav-vertical'
import Logo from '../../components/logo'
import SearchBar from './search-bar'
import NoticeButton from './notice'
import BreadCrumb from './bread-crumb'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { themeLayout, breadCrumb } = useSettings()

  const headerStyle: CSSProperties = {
    borderBottom: themeLayout === ThemeLayout.Horizontal ? `1px dashed gray` : '',
    backgroundColor: 'white',
    width: '100%',
  }

  return (
    <>
      <header
        className={cn(themeLayout === ThemeLayout.Horizontal ? 'relative' : 'sticky top-0 right-0 left-auto')}
        style={headerStyle}
      >
        <div
          className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-baseline">
            {themeLayout !== ThemeLayout.Horizontal ? (
              <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
                <SvgIcon icon="ic-menu" size="24" />
              </IconButton>
            ) : (
              <Logo />
            )}
            <div className="ml-4 hidden md:block">{breadCrumb ? <BreadCrumb /> : null}</div>
          </div>

          <div className="flex">
            <SearchBar />
            <IconButton onClick={() => window.open('https://github.com/SunnyYie/Next-React-Admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <NoticeButton />
            <SettingButton />
            <AccountDropdown />
          </div>
        </div>
      </header>

      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        width={themeLayout === ThemeLayout.Mini ? NAV_COLLAPSED_WIDTH : NAV_WIDTH}
      >
        <NavVertical closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  )
}
