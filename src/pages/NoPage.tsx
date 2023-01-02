import React from 'react'


//This is a 404 page that will be rendered when a route is not found using tailwindcss
const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-9xl font-bold">404</div>
      <div className="text-2xl font-bold">Page Not Found</div>
    </div>
  )
}

export default NoPage