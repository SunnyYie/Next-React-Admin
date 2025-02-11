import { Permission } from '../../../router/type'
import apiClient from '../../apiClient'

export enum UserApi {
  GetAllPermissions = 'user/getPermissionsAll',
  GetPermissions = 'user/getPermissions',
  GetPermissionsByCondition = 'user/getPermissionsByCondition',
  CreatePermission = 'user/createPermission',
  UpdatePermission = 'user/updatePermission',
  DeletePermission = 'user/deletePermission',
}

// 获取全部权限数组
const getAllPermissions = () => apiClient.get<Permission[]>({ url: UserApi.GetAllPermissions })
// 获取角色对应权限数组
const getPermissions = (roleId: string) =>
  apiClient.post<Permission[]>({ url: UserApi.GetPermissions, data: { roleId } })

// 条件查询权限
const getPermissionsByCondition = (data: any) =>
  apiClient.post({ url: UserApi.GetPermissionsByCondition, data })

// 新增用户权限
const createPermission = (data: { roleId: string; permissionData: Permission[] }) =>
  apiClient.post({ url: UserApi.CreatePermission, data })

// 修改用户权限
const updatePermission = (data: { permissionId: string; permissionData: Permission }) =>
  apiClient.put({ url: UserApi.UpdatePermission, data })

// 删除用户权限
const deletePermission = (data: { permissionId: string }) => apiClient.delete({ url: UserApi.DeletePermission, data })

export default {
  getAllPermissions,
  getPermissions,
  getPermissionsByCondition,
  createPermission,
  updatePermission,
  deletePermission,
}
