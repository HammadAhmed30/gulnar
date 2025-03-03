import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full flex justify-center items-center flex-col p-[10px] py-[220px]'>
        <h1 className='text-2xl font-bold text-center'>
            Thanks for shopping, our team will contact you soon.
        </h1>
        <Link href={"/"} className='underline mt-[20px]'>Continue Shopping</Link>
    </div>
  )
}
