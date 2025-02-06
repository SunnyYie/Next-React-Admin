import { type CSSProperties, Suspense, useMemo } from 'react'
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config'
import CircleLoading from '../components/circle-loading'
import { useSettings } from '../store/theme-setting'
import { ThemeLayout } from './components/nav/type'
import { cn } from '../utils'
import { Layout } from 'antd'

import Header from './components/header'
import Main from './components/main'
import Nav from './components/nav'

function DashboardLayout() {
  const { themeLayout } = useSettings()
  const layoutClassName = useMemo(() => {
    return cn('flex h-screen overflow-hidden', themeLayout === ThemeLayout.Horizontal ? 'flex-col' : 'flex-row')
  }, [themeLayout])

  // const mobileOrTablet = useMediaQuery(down('md'))

  const secondLayoutStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    paddingLeft:
      themeLayout === ThemeLayout.Horizontal ? 0 : themeLayout === ThemeLayout.Mini ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
  }

  return (
    <Layout className={layoutClassName}>
      <Suspense fallback={<CircleLoading />}>
        <Layout style={secondLayoutStyle}>
          <Header />
          <Nav />
          <Main />
        </Layout>
      </Suspense>
    </Layout>
  )
}
export default DashboardLayout
