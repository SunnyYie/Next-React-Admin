import { IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { Layout, Button } from '@arco-design/web-react'

const Header = Layout.Header

interface DefaultHeaderProps {
  collapsed: boolean
  handleCollapsed: () => void
}

export default function DefaultHeader({ collapsed, handleCollapsed }: DefaultHeaderProps) {
  return (
    <Header className="flex flex-row justify-between p-2">
      <Button shape="round" onClick={handleCollapsed} className="mx-5 my-1">
        {collapsed ? <IconCaretRight /> : <IconCaretLeft />}
      </Button>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </Header>
  )
}
