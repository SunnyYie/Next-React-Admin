import { Layout, Typography } from 'antd'
// import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

// import DashboardImg from '@/assets/images/background/dashboard.png'
// import Overlay from '@/assets/images/background/overlay.jpg'
// import LocalePicker from '@/components/locale-picker'
import { useUserToken } from '../../../store/user-setting'

// import SettingButton from '@/layouts/components/setting-button'
// import { themeVars } from '@/theme/theme.css'
// import { rgbAlpha } from '@/utils/theme'
import LoginForm from './LoginForm'
// import MobileForm from './MobileForm'
import RegisterForm from './RegisterForm'
import ResetForm from './ResetForm'
import { LoginStateProvider } from './providers/LoginStateProvider'

function Login() {
  // const { t } = useTranslation()
  const token = useUserToken()

  // 判断用户是否有权限
  if (token.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to="/dashboard/workbench" replace />
  }

  // const gradientBg = rgbAlpha(themeVars.colors.background.defaultChannel, 0.9)
  // const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay})`

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
        style={
          {
            // background: bg,
          }
        }
      >
        <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">Next React Admin</div>
        {/* <img className="max-w-[480px] xl:max-w-[560px]" src={DashboardImg} alt="" /> */}
        <Typography.Text className="flex flex-row gap-[16px] text-2xl">
          {/* {t('sys.login.signInSecondTitle')} */}
          {'Welcome to Next React Admin'}
        </Typography.Text>
      </div>

      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm />
          {/* <MobileForm /> */}
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className="absolute right-2 top-0 flex flex-row">
        {/* <LocalePicker /> */}
        {/* <SettingButton /> */}
      </div>
    </Layout>
  )
}
export default Login
