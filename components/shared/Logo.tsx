import React from 'react'
import Image from 'next/image'

type Props = {}

const Logo = (props: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
      <h2 className='font-bold text-xl'>
        Loopify
      </h2>
    </div>
  )
}

export default Logo