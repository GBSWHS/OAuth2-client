import Head from '../../components/Head'
import ClientList from '../../components/dash/ClientList'

import useSWR from 'swr'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Title from '../../components/Title'
import Userinfo from '../../components/dash/Userinfo'

const fetcher = (url: string) =>
  window.fetch(url, { headers: {
    Authorization: 'Bearer ' + window?.localStorage?.getItem?.('token') || ''
  }}).then(res => res.json())

export default function Dashboard () {
  const router = useRouter()
  
  useEffect(() => {
    if (!window.localStorage.getItem('token'))
      router.push('/login')
  })
  const { data, error } = useSWR('/api/me', fetcher)

  return (
    <div className="w-screen h-screen p-10 overflow-x-hidden">
      { !data ? (
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-black show-loading text-center text-blue-400">
          <h3>Loading...</h3>
        </div>
      ): <></>}

      {error ? ( // 연결 오류
        <div className="mx-5 p-3 mt-5 bg-red-100 rounded-sm text-center animate-pulse">
          백엔드 서버와 연결할 수 없습니다.<br/>
          네트워크 상태를 확인해주세요.
        </div>
      ): <></>}

      { !data?.success ? (
        <div className="mx-5 p-3 mt-5 bg-red-100 rounded-sm text-center animate-pulse">
          토큰이 만료되었습니다.<br/>
          다시 로그인해주세요.
        </div>
      ) : <></> }

      { data?.success ? (
        <div className='overflow-x-hidden'>
          <Userinfo info={data} />
          {/* <hr className='mt-5' /> */}
          <h1 className='mt-5 text-2xl font-bold'>내 애플리케이션</h1>
          <ClientList application={data.user.applications}/>  
        </div>
      ) : <></>}
      {/* <Link href="/dash/create"><button className="mt-3 border-0 font-bold bg-gbswhs6 text-white rounded px-3 py-2" type="submit">생성</button></Link>
      <Link href="/docs"><button className="mt-3 border-0 font-bold bg-gbswhs2 text-white rounded px-3 py-2" type="submit">문서</button></Link> */}
    </div>
  )
}
