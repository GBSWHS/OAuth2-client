import Head from '../components/Head'
import Logo from '../components/Logo'
import Title from '../components/Title'
import NoScript from '../components/NoScript'
import LoginForm from '../components/LoginForm'

import useSWR from 'swr'
import NProgress from 'nprogress'
import Router, { useRouter } from 'next/router'

NProgress.configure({ showSpinner: false })
NProgress.configure({ parent: '#loading' })

export default function Home() {
  let timer;
  let state;
  let activeRequests = 0;
  const delay = 10

  function load() {
    if (state === "loading") return
    state = "loading"
    timer = setTimeout(() => NProgress.start(), delay)
  }

  function stop() {
    if (activeRequests > 0) {
      return;
    }
    
    state = "stop";
    
    clearTimeout(timer);
    NProgress.done();
  }

  Router.events.on("routeChangeStart", load);
  Router.events.on("routeChangeComplete", stop);
  Router.events.on("routeChangeError", stop);

  const originalFetch = typeof window !== 'undefined' ? window.fetch : null
  if (typeof window !== 'undefined') window.fetch = async (...args) => {
    if (activeRequests === 0) {
      load();
    }

    activeRequests++;

    try {
      const response = await originalFetch(...args);
      return response;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      activeRequests -= 1;
      if (activeRequests === 0) {
        stop();
      }
    }
  }

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
      <Logo />
      <div className="flex h-full justify-center items-center">

        <div>
          <div className="mb-3">
            <Title />
          </div>
          <div className="shadow-2xl" id="loading">
            <div className="w-full h-2 bg-gbswhs2 relative z-0"></div>

            <div className="p-10">
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
                <div>
                  <h3 className="font-bold text-3xl">Login.</h3>
                  <LoginForm fetcher={window.fetch}/>
                </div>
              ) : <></>}

              {data && data?.success && !data?.needLogin ? ( // 데이터를 받았으며 성공이고 로그인이 필요한경우
                <div>
                  <h3 className="font-bold text-3xl">안녕하세요, {data.message.split('|')[0]}님.</h3>
                  <p className="my-2"><b>{data.message.split('|')[1]}</b>(으)로 로그인 하시겠습니까?</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button className="mt-3 border-0 font-bold bg-gbswhs6 text-white rounded px-3 py-2" onClick={() => window.location.replace(data?.redirect)}>로그인</button>
                    <button className="mt-3 border-0 font-bold bg-gray-500 text-white rounded px-3 py-2"  onClick={() => { window.localStorage.removeItem('token'); window.location.reload() }}>다른계정으로...</button>
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
