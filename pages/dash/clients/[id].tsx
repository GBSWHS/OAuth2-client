import Head from '../../../components/Head'

import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ClientStatus () {
  const router = useRouter()
  const fetcher = () => (url: string) =>
    fetch(url, { headers: {
      Authorization: 'Bearer ' + window?.localStorage?.getItem?.('dash_token') || ''
    }}).then(res => res.json())

  const { data, error } = useSWR('/internal/client?id=' + router.query.id, fetcher())

  if (!data) return <p>로딩중...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <Head description={"클라이언트 정보: " + router.query.id}/>
      <pre>{JSON.stringify(data.client, null, 2)}</pre>
      <Link href="/dash"><button className="mt-3 border-0 bg-gray-600 text-white rounded px-3 py-2" type="submit">돌아가기</button></Link>
    </div>
  )
}
