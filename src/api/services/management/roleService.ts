import { Role } from '../../../store/type'
import apiClient from '../../apiClient'

export enum UserApi {
  GetAllRoles = 'role/getRoles',
  CreateRole = 'role/createRole',
  UpdateRole = 'role/updateRole',
  DeleteRole = 'role/deleteRole',
}

// 获取全部角色
const getAllRoles = () => apiClient.get<Role[]>({ url: UserApi.GetAllRoles })

// 新增角色
const createRole = (data: Role) => apiClient.post({ url: UserApi.CreateRole, data })

// 修改角色
const updateRole = (data: { roleId: string; data: Role }) => apiClient.put({ url: UserApi.UpdateRole, data })

// 删除角色
const deleteRole = (data: { roleId: string }) => apiClient.delete({ url: UserApi.DeleteRole, data })

export default {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
}
