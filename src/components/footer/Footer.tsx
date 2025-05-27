import React from 'react'

export default function Footer() {
  return (
    // Removed id='blogs' as it's not relevant for footer.
    // Ensured full width and theme colors.
    <footer className='bg-custom-black w-full py-8 border-t border-custom-gray-dark'>
      <p className='text-custom-gray-medium text-sm text-center'>
        © Sai Krishna. All Rights Reserved.
      </p>
    </footer>
  )
}
