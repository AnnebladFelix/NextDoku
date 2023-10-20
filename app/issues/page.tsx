import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function issuesPage() {
  return (
    <div>
        <Button><Link href='/issues/new'> Add Issue </Link></Button>
        <Button><Link href='/issues/posts'> See Issues </Link></Button>
    </div>
  )
}
