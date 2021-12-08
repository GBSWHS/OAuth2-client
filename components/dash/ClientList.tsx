import moment from 'moment'
import Link from 'next/link'
import { useState } from 'react'

export default function ClientList ({ application }) {
  const [delToggle, setDetoggle] = useState(application.clients)
  if (!application) return <div></div>

  return (
    <div>
      <div className='flex gap-1 mt-2'>
        <Link href="/dash/clients/create"><a className='px-3 py-2 text-white bg-gbswhs2 rounded-lg cursor-pointer hover:bg-gbswhs3'>안녕하세요</a></Link>
        <a onClick={() => setDetoggle(delToggle ? false : true)} className={'px-3 py-2 text-white bg-red-400 rounded-lg cursor-pointer hover:bg-red-500' + (delToggle ? ' bg-red-600' : '')}>안녕하세요</a>
      </div>
      <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {(application.map((client) => (
          <Link href={'/dash/clients/' + client.app_id}>
            <div className='shadow-lg py-6 w-full h-full hover:bg-gray-100 cursor-pointer'>
              <div className='flex p-3 justify-center items-center'>
                <img src={client.app_icon} alt='avatar' className='h-16 w-16 rounded-lg' />
                <div className="ml-3">
                  <h1 className='text-xl font-bold'>{client.app_name}</h1>
                  <p className='text-gray-600'>{client.app_desc.slice(0,20)}</p>
                </div>
              </div><hr className='mt-5 mb-2'/>
              <div className='text-center w-full'> 
                <p className='text-gray-600'>id: {client.app_id}</p>
                {/* <p className='text-gray-600 mb-3'>{moment(client.app_created_at).format("YYYY/MM/DD")}</p> */}
                { delToggle ? <a className='bg-red-300 hover:bg-red-400 px-3 py-2 rounded-lg text-white' onClick={() => alert('시발 삭제요 개')}>삭제하기</a> : <></> }
              </div>
            </div>
          </Link>
        )))}    
      </div>
    </div>
  )
}
