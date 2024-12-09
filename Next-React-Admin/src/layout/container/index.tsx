import { Layout } from '@arco-design/web-react';

const Content = Layout.Content;

interface ConatainerProps {
    children?: React.ReactNode;
}

export default function Conatainer({ children }: ConatainerProps) {
    return (
        <Content className='text-base flex flex-col mx-4'>
            {children}
        </Content>
    )
}