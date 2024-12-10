import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting_routers/routers_table')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/setting_routers/routers_table"!</div>
}
