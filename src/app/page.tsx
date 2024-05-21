"use client"
import React from 'react'
import { useEffect } from 'react';

const page = () => {
  useEffect(()=>{
    window.location.href = '/pages/home'
  },[])
  return (
    <div>loading...</div>
  )
}

export default page
