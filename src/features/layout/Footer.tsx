import eagleBranding from '@/assets/EagleWearBranding.png'

export const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white p-4'>
      <img src={eagleBranding} alt="eaglewear logo" className="aspect-video w-32 mb-2 mx-auto" />
      <p className='text-center text-sm'>
        &copy; Eagle Wear 2025
      </p>
    </footer>
  )
}
