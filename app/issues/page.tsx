import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function issuesPage() {
  return (
    <div className="flex justify-start flex-col max-w-6xl w-full">
      <div>
      <Button mb="3"><Link href='/'> Back </Link></Button>
      </div>
      <div>
          <Button mr="3"><Link href='/issues/new'> Add document </Link></Button>
          <Button><Link href='/issues/posts'> Edit documents </Link></Button>
      </div>
    </div>
  )
}
