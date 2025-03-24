import { LogOut } from 'lucide-react'
import { useStore } from 'zustand'
import { useAuthStore } from '../auth/authStore'
import { ShoppingCartDrawer } from '../cart/ShoppingCartDrawer'

export const Header = () => {
  const logout = useStore(useAuthStore, (state) => state.logout)
  return (
    <header className='sticky top-0 z-50 bg-white shadow w-full flex p-4 items-center justify-between'>
      <h2 className='font-bold text-2xl'>Eagle<span className='text-red-600'>Wear</span></h2>
      <div className='flex gap-4'>
        <button onClick={logout}>
          <LogOut />
        </button>
        <ShoppingCartDrawer />
      </div>
    </header>
  )
}
