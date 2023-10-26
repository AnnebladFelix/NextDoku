import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function issuesPage() {
  return (
    <>
    <Button><Link href='/'> Back </Link></Button>
      <div>
          <Button><Link href='/issues/new'> Add document </Link></Button>
          <Button><Link href='/issues/posts'> Edit document </Link></Button>
      </div>
    </>
  )
}
