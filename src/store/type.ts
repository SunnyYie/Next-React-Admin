import { Permission } from '../router/type'

export interface UserToken {
  accessToken?: string
  refreshToken?: string
}

export interface PermissionKey {
  id: string
  label: string
}

export interface UserInfo {
  id: string
  email: string
  username: string
  password?: string
  avatar?: string
  role?: Role
  permissions?: Permission[]
  permissionKeys?: PermissionKey[]
}

export interface Role {
  id: string
  name: string
  label: string
  order?: number
  desc?: string
  permission?: Permission[]
}

export enum StorageEnum {
  UserInfo = 'userInfo',
  UserToken = 'userToken',
  Settings = 'settings',
  I18N = 'i18nextLng',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}
