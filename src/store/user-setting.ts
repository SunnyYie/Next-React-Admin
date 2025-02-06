import userService, { type SignInReq } from '@/api/services/userService'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { UserInfo, UserToken } from '#/entity'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { StorageEnum } from '#/enum'
import { create } from 'zustand'
import { toast } from 'sonner'

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
      setUserInfo(user)
      navigatge('/dashboard/workbench', { replace: true })
      toast.success('Sign in success!')
    } catch (err: any) {
      toast.error(err.message, {
        position: 'top-center',
      })
    }
  }

  return signIn
}

export default useUserStore
