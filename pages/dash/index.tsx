import ClientList from '../../components/ClientList'

import useSWR from 'swr'
import { useRouter } from 'next/router'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())
export default function Dashboard () {
  const router = useRouter()
  const url = new URL(router.asPath, 'http://example.com')
  const { data, error } = useSWR('/external/auth?' + url.searchParams.toString(), fetcher)
  
  if (data && !data.success && !window.localStorage.getItem('dash_token')) router.push('/auth?client_id=0&redirect_uri=/dash&response_type=code')
  if (data && data.success) {
    history.replaceState(null, '', window.location.pathname)
    window.localStorage.setItem('dash_token', data.token)
  }

  return (
    <div className="w-screen h-screen">
      {!data ? (
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-black show-loading text-center text-blue-400">
          <h3>Loading...</h3>
        </div>
      ): <></>}

      {error ? ( // 연결 오류
        <div className="border-t-4 border-red-500 p-3 mt-5 bg-red-100 rounded text-center">
          백엔드 서버를 연결할 수 없습니다.
        </div>
      ): <></>}

      <Link href="/dash/create"><button className="mt-3 border-0 font-bold bg-gbswhs6 text-white rounded px-3 py-2" type="submit">생성</button></Link>
      <ClientList />
    </div>
  )
}