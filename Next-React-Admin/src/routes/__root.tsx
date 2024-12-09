import { SignInButton, SignedOut, useUser } from '@clerk/clerk-react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import BreadCrumb from '../layout/components/bread-crumb'
import React, { Suspense, useState } from 'react'
import { Button, Layout } from '@arco-design/web-react'
import Conatainer from '../layout/container'
import DefaultFooter from '../layout/footer'
import DefaultHeader from '../layout/header'
import SideBar from '../layout/sidebar'
import { motion } from 'framer-motion'

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools
            })),
        )

export const Route = createRootRoute({
    component: () => (
        <DefaultLayout />
    )
})

function DefaultLayout() {
    const { isSignedIn, isLoaded } = useUser()
    const [collapsed, setCollapsed] = useState(false)

    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return <Login />
    }

    return (
        <Layout className='h-[100vh] border border-solid border-gray-400  flex flex-row'>
            <SideBar collapsed={collapsed} />

            <Layout>
                <DefaultHeader collapsed={collapsed} handleCollapsed={() => setCollapsed(!collapsed)} />

                <Layout className='py-4 bg-gray-100'>
                    <Conatainer>
                        <BreadCrumb />
                        <div className='my-4 flex-1' style={{ backgroundColor: 'white' }}>
                            <Outlet />

                            <Suspense>
                                <TanStackRouterDevtools />
                            </Suspense>
                        </div>
                    </Conatainer>

                    <DefaultFooter />
                </Layout>
            </Layout>
        </Layout>
    )
}

function Login() {
    return (
        <main className="h-[100vh] bg-gradient-to-br md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black">
            <div className="flex flex-col justify-center space-y-6 text-center flex-1 h-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'white' }}>欢迎来到Next React Admin</h1>
                    <p className="text-xl text-blue-200 mb-8">下一代React后台管理系统</p>

                    <SignedOut>
                        <SignInButton fallbackRedirectUrl='/' signUpFallbackRedirectUrl='/'>
                            <Button type='primary' size='large'>
                                登录
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </motion.div>
            </div>
        </main>
    )
}