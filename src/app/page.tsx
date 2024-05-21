import React from 'react'
import { redirect } from 'next/navigation';

const page = () => {
  redirect('/pages/home')
  return (
    <div>page</div>
  )
}

export default page
