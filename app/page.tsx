import Link from "next/link";
import DisplayDocument from "./DisplayDocument";
import {Button} from '@radix-ui/themes'

export default function Home() {
  return (
    <div>
      <h1>Welcome to NextDoku.</h1>
      <p>This is a Next.js project to create documents.</p>
      
      <Button><Link href='/issues'> Edit and Add document </Link></Button>
      <DisplayDocument />
    </div>
  )
}
