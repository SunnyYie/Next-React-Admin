import { InterfaceLog } from '../../../pages/log/type'
import apiClient from '../../apiClient'

export enum IntefaceLogApi {
  GetAllInterfaceLogs = 'log/getInterfaceLogs',
  GetInterfaceLogsByCondition = 'log/getInterfaceLogsByCondition',
  DeleteInterfaceLog = 'log/deleteInterfaceLog',
}

// 获取全部接口日志
const getAllInterfaceLogs = () => apiClient.get<InterfaceLog[]>({ url: IntefaceLogApi.GetAllInterfaceLogs })

// 条件查询接口日志
const getInterfaceLogsByCondition = (data: any) =>
  apiClient.post({ url: IntefaceLogApi.GetInterfaceLogsByCondition, data })

// 删除对应日志
const deleteInterfaceLog = (data: { logId: string }) =>
  apiClient.delete({ url: IntefaceLogApi.DeleteInterfaceLog, data })

export default {
  getAllInterfaceLogs,
  getInterfaceLogsByCondition,
  deleteInterfaceLog,
}
