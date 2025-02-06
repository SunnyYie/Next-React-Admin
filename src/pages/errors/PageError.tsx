import { Result, Button } from 'antd'
import { motion } from 'framer-motion'

const GeneralErrorPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Result
      status="error"
      title="Error"
      subTitle={'Sorry, an unexpected error occurred.'}
      extra={<Button type="primary">Back Home</Button>}
    />
  </motion.div>
)

export default GeneralErrorPage
