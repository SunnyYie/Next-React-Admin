import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="m-4 rounded-xl shadow border p-8 bg-gray-200">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <p className="text-lg">
        Hello React and tailwindcss
      </p>
    </div>
  )
}
