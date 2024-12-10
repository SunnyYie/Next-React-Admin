import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting_routers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/setting_routers/"!</div>
}
