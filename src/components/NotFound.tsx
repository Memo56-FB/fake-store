import error404 from '../assets/Error404.svg'

export const NotFound = () => {
  return (
    <main className='grid place-items-center h-dvh'>
      <img className='max-h-screen' src={error404} alt="Page not found" />
    </main> 
  )
}
