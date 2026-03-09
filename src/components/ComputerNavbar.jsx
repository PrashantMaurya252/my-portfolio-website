'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const ComputerNavbar = ({items}) => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <div className='w-full h-[100px] flex justify-end items-center gap-5 px-[20px] bg-white text-[var(--primary-1)] font-semibold text-md border-b-[2px] border-solid border-[var(--primary-1)] '>
        {items.map((item)=>(
            <span key={item.id} className={`${pathname === item?.path ? 'text-white bg-[var(--primary-2)] px-[10px] py-[5px] rounded-md':''} cursor-pointer`} onClick={()=>router.push(`${item.path}`)}>{item.label}</span>
        ))}
    </div>
  )
}

export default ComputerNavbar