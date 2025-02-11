import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'
import { Modal } from 'antd'

export type UseToastConfirmType = {
  title: string
  content: string
  icon?: ReactNode
  onOk: () => void
  onCancel?: () => void
}

const useToastConfirm = () => {
  const showDeleteConfirm = ({ title, content, icon = <ExclamationCircleOutlined />, onOk }: UseToastConfirmType) => {
    Modal.confirm({
      content,
      icon,
      title,
      onOk: () => onOk(),
    })
  }

  return showDeleteConfirm
}

export default useToastConfirm
