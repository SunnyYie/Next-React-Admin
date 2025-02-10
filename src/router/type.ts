import type { Params, RouteObject } from 'react-router'
import type { ReactNode } from 'react'

export interface RouteMeta {
  /**
   * antd menu selectedKeys
   */
  key: string
  /**
   * menu label, i18n
   */
  label: string
  /**
   * menu prefix icon
   */
  icon?: ReactNode
  /**
   * menu suffix icon
   */
  suffix?: ReactNode
  /**
   * hide in menu
   */
  hideMenu?: boolean
  /**
   * hide in multi tab
   */
  hideTab?: boolean
  /**
   * disable in menu
   */
  disabled?: boolean
  /**
   * react router outlet
   */
  outlet?: ReactNode
  /**
   * use to refresh tab
   */
  timeStamp?: string
  /**
   * external link and iframe need
   */
  frameSrc?: URL
  /**
   * dynamic route params
   *
   * @example /user/:id
   */
  params?: Params<string>
}
export type AppRouteObject = {
  order?: number
  meta?: RouteMeta
  children?: AppRouteObject[]
} & Omit<RouteObject, 'children'>

export enum PermissionType {
  CATALOGUE = 0,
  MENU = 1,
  BUTTON = 2,
  catalogue = 'CATALOGUE',
  menu = 'MENU',
  button = 'BUTTON',
}

export enum Role {
  AMDIN = 1,
  USER = 2,
  admin = 'ADMIN',
  user = 'USER',
}

export interface PermissionRole {
  id: string
  roleId: string
  permissionId: string
}

export interface Permission {
  id: string
  parentId: string
  name: string
  label: string
  type: PermissionType
  route: string
  order?: number
  icon?: string
  component?: string
  hide?: boolean
  hideTab?: boolean
  frameSrc?: URL
  newFeature?: boolean
  children?: Permission[]

  roles?: PermissionRole[]
}
