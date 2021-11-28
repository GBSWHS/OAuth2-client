import Head from 'next/head'
import Title from '../components/Title'
import { NextPage } from 'next'
import LoginForm from '../components/LoginForm'

const Login: NextPage = () => {
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
              <LoginForm fetcher={window.fetch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
