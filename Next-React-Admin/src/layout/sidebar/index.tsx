import { IconHome } from '@arco-design/web-react/icon';
import { Layout, Menu } from '@arco-design/web-react';

const Sider = Layout.Sider;
const MenuItem = Menu.Item;

interface SideBarProps {
    collapsed: boolean;
}

export default function SideBar({ collapsed }: SideBarProps) {
    return (
        <Sider collapsed={collapsed} collapsible trigger={null} breakpoint='xl'>
            <div className='h-8 my-4 m-2 text-center flex justify-around items-center font-medium text-base'>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#7E20D8" /><rect x="22" y="10" width="12" height="4.8" rx=".497" transform="rotate(90 22 10)" fill="#fff" /><rect x="14.8" y="10" width="4.8" height="4.8" rx=".497" transform="rotate(90 14.8 10)" fill="#fff" /><rect x="14.8" y="17.2" width="4.8" height="4.8" rx=".497" transform="rotate(90 14.8 17.2)" fill="#fff" /></svg>
                {collapsed ? '' : 'Next React Admin'}
            </div>
            <Menu className='w-[100%]'>
                <MenuItem key='0_1'>
                    <IconHome />
                    Menu 1
                </MenuItem>
            </Menu>
        </Sider>
    )
}