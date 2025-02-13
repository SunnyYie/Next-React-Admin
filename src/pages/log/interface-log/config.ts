export const osOptions = [
  { label: 'Windows', value: 'Windows' },
  { label: 'Mac', value: 'Mac' },
  { label: 'Linux', value: 'Linux' },
  { label: 'Android', value: 'Android' },
  { label: 'iOS', value: 'iOS' },
]

export const methodOptions = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
]

export const statusOptions = [
  { label: '200', value: '200' },
  { label: '201', value: '201' },
  { label: '404', value: '404' },
  { label: '500', value: '500' },
]

export const SearchConfig = [
  { name: 'url', label: '请求路径', type: 'input' },
  { name: 'os', label: '操作系统', type: 'select', options: osOptions },
  { name: 'referrer', label: '来源', type: 'input' },
  { name: 'method', label: '请求方法', type: 'select', options: methodOptions },
  { name: 'status', label: '状态', type: 'select', options: statusOptions },
]
