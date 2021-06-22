import Head from '../components/Head'
import Logo from '../components/Logo'
import Title from '../components/Title'
import NoScript from '../components/NoScript'
import LoginForm from '../components/LoginForm'

import useSWR from 'swr'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const fetcher = () => (url: string) =>
    fetch(url, { headers: {
      Authorization: 'Bearer ' + window?.localStorage?.getItem?.('token') || ''
    }}).then(res => res.json())
  
  const url = new URL(router.asPath, 'http://example.com')
  const { data, error } = useSWR('/internal/checkClient?' + url.searchParams.toString(), fetcher())

  if (data && data?.success && !data?.needLogin)
    window.location.replace(data?.redirect)
  
  return (
    <div className="w-screen h-screen">
      <Head />
      <Logo />
      <div className="flex h-full justify-center items-center">
        <div className="p-5">
          <Title />
          <NoScript />

          {!data ? ( // 데이터 대기중
            <div className="border-t-4 border-gray-500 p-3 mt-5 bg-gray-200 rounded text-center">
              로딩중...
            </div>
          ): <></>}

          {error ? ( // 연결 오류
            <div className="border-t-4 border-red-500 p-3 mt-5 bg-red-100 rounded text-center">
              백엔드 서버를 연결할 수 없습니다.
            </div>
          ): <></>}

          {data && !data?.success ? ( // 데이터를 받았으나 성공이 아닐경우
            <div className="border-t-4 border-red-500 p-3 mt-5 bg-red-100 rounded text-center">
              {data?.message}
            </div>
          ) : <></>}
          
          {data && data?.success && data?.needLogin ? ( // 데이터를 받았으며 성공이고 로그인이 필요한경우
            <LoginForm />
          ) : <></>}

          {data && data?.success && !data?.needLogin ? ( // 데이터를 받았으며 성공이고 로그인이 필요한경우
            <div className="border-t-4 border-green-500 p-3 mt-5 bg-green-200 rounded text-center">
              확인됨, 진행중...
            </div>
          ) : <></>}
        </div>
      </div>
    </div>
  )
}
