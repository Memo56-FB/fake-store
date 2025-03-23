import { ShoppingCart, User } from 'lucide-react'
import { Outlet } from 'react-router'

export const Layout = () => {
  return (
    <main className='min-h-dvh bg-gray-50'>
      <header className='sticky top-0 z-10 bg-white shadow w-full flex p-4 items-center justify-between'>
        <h2 className='font-bold text-2xl'>Eagle<span className='text-red-600'>Wear</span></h2>
        <div className='flex gap-4'>
          <User />
          <ShoppingCart />
        </div>
      </header>
      <Outlet />
    </main>
  )
}
