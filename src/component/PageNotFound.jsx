import React from 'react'
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
    <div className='flex flex-col justify-center gap-5 h-screen text-center'>
      <h1 className='text-4xl font-medium '>404 Page Not Found</h1>
      <Link to='/'>
      <button className='bg-black text-white p-3 rounded-md'>
        Go Back Home
      </button>
      </Link>
    </div>
  )
}

export default PageNotFound
