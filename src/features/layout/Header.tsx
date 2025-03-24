import { LogOut, ShoppingCart } from 'lucide-react'
import { useStore } from 'zustand'
import { useAuthStore } from '../auth/authStore'

export const Header = () => {
  const logout = useStore(useAuthStore, (state) => state.logout)
  return (
    <header className='sticky top-0 z-10 bg-white shadow w-full flex p-4 items-center justify-between mb-4'>
      <h2 className='font-bold text-2xl'>Eagle<span className='text-red-600'>Wear</span></h2>
      <div className='flex gap-4'>
        <button onClick={logout}>
          <LogOut />
        </button>
        <ShoppingCart />
      </div>
    </header>
  )
}
