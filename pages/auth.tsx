import Head from '../components/Head'
import Title from '../components/Title'
import NoScript from '../components/NoScript'
import LoginForm from '../components/LoginForm'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

import useSWR from 'swr'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const fetcher = (url: string) =>
    window.fetch(url, { headers: {
      Authorization: 'Bearer ' + window?.localStorage?.getItem?.('token') || ''
    }}).then(res => res.json())
  
  const url = new URL(router.asPath, 'http://example.com')
  const { data, error } = useSWR('/internal/checkClient?' + url.searchParams.toString(), fetcher)
  
  return (
    <div className="w-screen h-screen">
      <Head description="로그인"/>
      <div className="flex h-full justify-center items-center">
        <div className="lg:w-3/12 md:w-4/12 sm:w-5/12 w-full mx-2">
          <div className="mb-3">
            <Title />
          </div>
          <div className="shadow-2xl rounded-lg" id="loading">
            <div className="p-10 w-full">
              <NoScript />
              {!data ? ( // 데이터 대기중
                <div className="animate-pulse p-3 mt-5 bg-gray-200 rounded text-center">
                  로딩중...
                </div>
              ): <></>}

              {error ? ( // 연결 오류
                <div className="p-3 mt-5 bg-red-100 rounded text-center">
                  백엔드 서버를 연결할 수 없습니다.
                </div>
              ): <></>}

              {data && !data?.success && !data?.needLogin ? ( // 데이터를 받았으나 성공이 아닐경우
                <div className="p-3 mt-5 bg-red-100 rounded text-center">
                  {data?.error_description}
                </div>
              ) : <></>}
              
              {data && data?.needLogin ? ( // 데이터를 받았으며 성공이고 로그인이 필요한경우
                <div>
                  <h3 className="font-bold text-3xl">Login</h3>
                  <LoginForm fetcher={window.fetch}/>
                </div>
              ) : <></>}

              {data && data?.success && !data?.needLogin ? ( // 데이터를 받았으며 성공이고 로그인이 필요한경우
                <div>
                  <h3 className="font-bold text-2xl">{data.app_name}</h3>
                  <p><b>{data.app_owner}</b>님의 애플리케이션입니다.</p>
                  <small>{data.app_desc}</small>
                  <div className="mt-5 bg-green-400 p-3 rounded-xl flex justify-items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className='h-6 mr-2 text-white' />
                    <p className="text-white">학생 데이터를 수집합니다.</p>
                  </div>
                  { data.app_permission < 2
                    ? <div className="mt-1 bg-red-400 p-3 rounded-xl flex justify-items-center">
                        <FontAwesomeIcon icon={faMinusCircle} className='h-6 mr-2 text-white' />
                        <p className="text-white">이메일과 전화번호를 수집하지 않습니다.</p>
                      </div>
                    : <div className="mt-1 bg-green-400 p-3 rounded-xl flex justify-items-center">
                        <FontAwesomeIcon icon={faCheckCircle} className='h-6 mr-2 text-white' />
                        <p className="text-white">이메일과 전화번호를 수집합니다.</p>
                      </div>
                  }
                  <div className="flex flex-wrap gap-3">
                    <button className="mt-3 border-0 font-bold bg-gbswhs2 hover:bg-gbswhs3 text-white rounded px-3 py-2" onClick={() => window.location.replace(data?.redirect)}>{data.user_nickname}님으로 계속</button>
                    <button className="mt-3 border-0 font-bold bg-gbswhs2 hover:bg-gbswhs3 text-white rounded px-3 py-2"  onClick={() => { window.localStorage.removeItem('token'); window.location.reload() }}>다른계정으로...</button>
                  </div>
                </div>
              ) : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
