import { NavLink } from 'react-router'
import { Iconify } from './icon'

interface Props {
  size?: number | string
}
function Logo({ size = 50 }: Props) {
  return (
    <NavLink to="/">
      <Iconify icon="solar:code-square-bold" size={size} />
    </NavLink>
  )
}

export default Logo
