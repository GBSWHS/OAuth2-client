import Link from 'next/link'
import { useState } from 'react'

export default function UserInfo ({ info }) {
  const [address, setAddress] = useState(false)

  if (!info) return <div>Data Not Found</div>
  return (
    <div className="gap-3 flex flex-wrap">
      <div className='shadow-lg p-6 2xl:w-2/12 xl:w-3/12 lg:w-3/12 md:w-4/12 w-full h-full'>
        <div className='flex justify-center items-center'>
          <img src={info.user.student.image} alt='avatar' className='rounded-full h-16 w-16' />
        </div>
        <div className='text-center mt-4 mb-2'>
          <h1 className='text-xl font-bold'>{info.user.realname} | {info.user.nickname}</h1>
          <p className='text-gray-600'>{info.user.student.grade}학년 {info.user.student.class}반 {info.user.student.number}번 재학중</p>
          { info.user.student !== '' ? <p className='text-gray-600'>{info.user.student?.room.toString().slice(0, 1)}층 {info.user.student?.room}호 기숙사생</p> : <></> }
          { info.user.group ? <p className='text-gray-600'><b>{info.user.group.name}</b>그룹</p> : <></> }
        </div><hr className='mb-2'/>
        <div className='text-center mb-4'>
          <p className='text-gray-600'>{info.user.email}</p>
          { info.user.student !== '' ? <p className='text-gray-600'>0{info.user.student.phone}</p> : <></> }
          { address ? <p className='text-gray-600'>{info.user.student.address}</p> : <p className='cursor-pointer' onClick={() => setAddress(true)}>주소보기</p> }
        </div>
      </div>
      <div className='shadow-lg p-6 2xl:w-2/12 xl:w-3/12 lg:w-3/12 md:w-4/12 w-full h-full'>
        <div className='flex justify-center items-center'>
          <img src={info.user.student.image} alt='avatar' className='rounded-full h-16 w-16' />
        </div>
        <div className='text-center mt-4 mb-2'>
          <h1 className='text-xl font-bold'>{info.user.realname} | {info.user.nickname}</h1>
          <p className='text-gray-600'>{info.user.student.grade}학년 {info.user.student.class}반 {info.user.student.number}번 재학중</p>
          { info.user.student !== '' ? <p className='text-gray-600'>{info.user.student?.room.toString().slice(0, 1)}층 {info.user.student?.room}호 기숙사생</p> : <></> }
          { info.user.group ? <p className='text-gray-600'><b>{info.user.group.name}</b>그룹</p> : <></> }
        </div><hr className='mb-2'/>
        <div className='text-center mb-4'>
          <p className='text-gray-600'>{info.user.email}</p>
          { info.user.student !== '' ? <p className='text-gray-600'>0{info.user.student.phone}</p> : <></> }
          { address ? <p className='text-gray-600'>{info.user.student.address}</p> : <p className='cursor-pointer' onClick={() => setAddress(true)}>주소보기</p> }
        </div>
      </div>
    </div>
  )
}