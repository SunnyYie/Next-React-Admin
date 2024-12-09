import { IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { Layout, Button } from '@arco-design/web-react';

const Header = Layout.Header;

interface DefaultHeaderProps {
    collapsed: boolean;
    handleCollapsed: () => void;
}

export default function DefaultHeader({ collapsed, handleCollapsed }: DefaultHeaderProps) {
    return (
        <Header>
            <Button shape='round' onClick={handleCollapsed} className='mx-5 my-3'>
                {collapsed ? <IconCaretRight /> : <IconCaretLeft />}
            </Button>
        </Header>
    )
}