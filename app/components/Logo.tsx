import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <section >
      <Link href='/'>
        <Image
        src="/images/nextdoku-logo-black.png"
        width={150}
        height={0}
        alt='NextDoku Logo'
        priority={true}
        />
      </Link>
    </section>
  )
}
