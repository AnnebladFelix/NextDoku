import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Image src="/images/logo.png" alt="logo" width={200} height={200} />
      <h2>Welcome to Next.js!</h2>
      <p>This is a sample Next.js project.</p>
      <p>
        <a href="https://nextjs.org/docs">Learn more about Next.js</a>
      </p>
    </div>
  )
}
