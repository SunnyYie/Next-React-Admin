import { Store } from '@tanstack/react-store'

type UserInfo = {
  id: string
}

export type StoreType = {
  userInfo: UserInfo | null
}

export const store = new Store<StoreType>({
  userInfo: null,
})
