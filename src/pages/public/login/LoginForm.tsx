import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd'
import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from 'react-icons/ai'

// import { DEFAULT_USER, TEST_USER } from "@/_mock/assets";

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider'
import { SignInReq } from '../../../api/services/userService'
import { useSignIn } from '../../../store/user-setting'

function LoginForm() {
  // const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const { loginState, setLoginState } = useLoginStateContext()
  const signIn = useSignIn()

  if (loginState !== LoginStateEnum.LOGIN) return null

  const handleFinish = async ({ email, password }: SignInReq) => {
    setLoading(true)
    try {
      await signIn({ email, password })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{'登陆'}</div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          // username: DEFAULT_USER.username,
          // password: DEFAULT_USER.password,
        }}
        onFinish={handleFinish}
      >
        <div className="mb-4 flex flex-col">
          <Alert
            description={
              <div className="flex flex-col">
                <div className="flex">
                  <span className="flex-shrink-0 text-text-disabled">{'用户名'}:</span>
                  <span className="ml-1 text-text-secondary">
                    {/* {DEFAULT_USER.username} / {TEST_USER.username}  */}
                  </span>
                </div>
                <div className="flex">
                  <span className="flex-shrink-0 text-text-disabled">{'密码'}:</span>
                  <span className="ml-1 text-text-secondary">{/* {DEFAULT_USER.password} */}</span>
                </div>
              </div>
            }
            showIcon
          />
        </div>

        <Form.Item name="email" rules={[{ required: true, message: '用户名格式有误' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码格式有误' }]}>
          <Input.Password type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Row align="middle">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{'记住密码'}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="link"
                className="!underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
                size="small"
              >
                {'忘记密码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {'登录'}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col flex="1" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
            <Button className="w-full !text-sm">{'注册'}</Button>
          </Col>
        </Row>

        <Divider className="!text-xs">{'其他方式登陆'}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  )
}

export default LoginForm
