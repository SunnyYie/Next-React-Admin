import { useLoginStateContext } from '../../pages/public/login/providers/LoginStateProvider'
import Dropdown, { type DropdownProps } from 'antd/es/dropdown/dropdown'
import { useUserActions, useUserInfo } from '../../store/user-setting'
import { NavLink, useNavigate } from 'react-router'
import { IconButton } from '../../components/icon'
import { Divider, type MenuProps } from 'antd'
// import { useTranslation } from 'react-i18next'
import React from 'react'

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
  const { username, email, avatar } = useUserInfo()
  const { clearUserInfoAndToken } = useUserActions()
  const { backToLogin } = useLoginStateContext()
  // const { t } = useTranslation();

  const navigate = useNavigate()

  const logout = () => {
    try {
      clearUserInfoAndToken()
      backToLogin()
    } catch (error) {
      console.log(error)
    } finally {
      navigate('/login')
    }
  }

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  }

  const dropdownRender: DropdownProps['dropdownRender'] = menu => (
    <div>
      <div className="flex flex-col items-start p-4">
        <div>{username}</div>
        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  )

  const items: MenuProps['items'] = [
    {
      label: <NavLink to="/management/user/profile">{'个人信息'}</NavLink>,
      key: '2',
    },
    {
      label: <NavLink to="/management/user/account">{'账号'}</NavLink>,
      key: '3',
    },
    { type: 'divider' },
    {
      label: (
        <button className="font-bold text-warning" type="button">
          {'退出登陆'}
        </button>
      ),
      key: '4',
      onClick: logout,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
      </IconButton>
    </Dropdown>
  )
}
