import Link from "next/link";
import DisplayDocument from "./DisplayDocument";
import {Button} from '@radix-ui/themes'

export default function Home() {
  return (
    <div className="flex justify-start flex-col max-w-6xl w-full">
      <h1 className='text-3xl font-bold'>Welcome to NextDoku.</h1>
      <p>This is a Next.js project to create documents.</p>
      <div className=" max-w-xs mb-3 mt-3">
        <Button size="3"><Link href='/issues'> Edit and Add document </Link></Button>
      </div>
      <DisplayDocument />
    </div>
  )
}
