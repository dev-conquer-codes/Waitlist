import Navbar from '@/app/_components/Navbar'
import React from 'react'
import TemplateSelector from './_components/TemplateSelector'
import UserSync from '@/app/_components/UserSync'

export default function Resume_Dashboard() {
  return (
    <div>
          <UserSync />
        <Navbar/>
        <TemplateSelector/>
    </div>
  )
}
