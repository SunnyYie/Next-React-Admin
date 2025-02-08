import userService, { type SignInReq } from '../api/services/userService'
import { createJSONStorage, persist } from 'zustand/middleware'
import { StorageEnum, UserInfo, UserToken } from './type'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { create } from 'zustand'
import { mergeRoutes } from '../router/utils'

type UserStore = {
  userInfo: Partial<UserInfo>
  userToken: UserToken
  actions: {
    setUserInfo: (userInfo: UserInfo) => void
    setUserToken: (token: UserToken) => void
    clearUserInfoAndToken: () => void
  }
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      userInfo: {},
      userToken: {},
      actions: {
        setUserInfo: userInfo => {
          set({ userInfo })
        },
        setUserToken: userToken => {
          set({ userToken })
        },
        clearUserInfoAndToken() {
          set({ userInfo: {}, userToken: {} })
        },
      },
    }),
    // 将数据存储到 localStorage
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken,
        
      }),
    },
  ),
)

export const useUserInfo = () => useUserStore(state => state.userInfo)
export const useUserToken = () => useUserStore(state => state.userToken)
export const useUserPermission = () => useUserStore(state => state.userInfo.permissions)
export const useUserPermissionKeys = () => useUserStore(state => state.userInfo.permissionKeys)
export const useUserActions = () => useUserStore(state => state.actions)

export const useSignIn = () => {
  const navigatge = useNavigate()
  const { setUserToken, setUserInfo } = useUserActions()

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  })

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data)
      const { user, accessToken, refreshToken } = res

      setUserToken({ accessToken, refreshToken })

      const permissions = mergeRoutes(user.permissions!)
      setUserInfo({
        ...user,
        permissions,
      })
      navigatge('/')

      console.log('Sign in success!')
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return signIn
}

export default useUserStore
