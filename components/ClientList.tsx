import useSWR from 'swr'
import Link from 'next/link'

export default function ClientList () {
  const fetcher = () => (url: string) =>
    fetch(url, { headers: {
      Authorization: 'Bearer ' + window?.localStorage?.getItem?.('dash_token') || ''
    }}).then(res => res.json())

  const { data, error } = useSWR('/internal/clients', fetcher())

  if (!data) return <>Loading...</>
  if (error) return <>Error: {error}</>
  if (!data.success) return <>Error: {data.message}</>

  return (
    <div className="flex gap-3 flex-wrap">
      {(data.clients||[]).map((client) => (
        <Link href={'/dash/clients/' + client.id}>
          <div className="bg-white inline p-10 shadow rounded-lg hover:shadow-lg">
            <img src={client.icon}/>
            <p>{client.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
