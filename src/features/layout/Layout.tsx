import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-dvh bg-gray-50 grid grid-rows-[auto_1fr]'>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
