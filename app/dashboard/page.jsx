import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Listing from './_components/Listing'

function Dashboard() {
  return (
    <div>
      {/* <UserButton></UserButton> */}
      <Listing/>
    </div>
  )
}

export default Dashboard
