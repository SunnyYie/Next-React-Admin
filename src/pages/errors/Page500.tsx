import type React from 'react'
import { Result, Button } from 'antd'
import { motion } from 'framer-motion'

const ServerErrorPage: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong on our server."
      extra={<Button type="primary">Back Home</Button>}
    />
  </motion.div>
)

export default ServerErrorPage
