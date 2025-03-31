import { LogOut } from 'lucide-react'
import { useStore } from 'zustand'
import { useAuthStore } from '../auth/authStore'
import { ShoppingCartDrawer } from '../cart/ShoppingCartDrawer'
import { Link } from 'react-router'

export const Header = () => {
  const logout = useStore(useAuthStore, (state) => state.logout)
  return (
    <header className='sticky top-0 z-50 bg-white shadow w-full flex p-4 items-center justify-between'>
      <Link to="/">
        <h2 className='font-bold text-2xl'>Fake<span className='text-purple-800'> Store</span></h2>
      </Link>
      <div className='flex gap-4'>
        <button onClick={logout}>
          <LogOut />
        </button>
        <ShoppingCartDrawer />
      </div>
    </header>
  )
}
