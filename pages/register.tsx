import Link from 'next/link'
import { NextPage } from 'next'
import Title from '../components/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons'
import RegisterForm from '../components/RegisterForm'

const Login: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full justify-center items-center">
        <div className="lg:w-3/12 md:w-4/12 sm:w-5/12 w-full mx-2">
          <div className="mb-3">
            <Title />
          </div>
          <div className="shadow-2xl rounded-lg">
            <div className="p-10 h-full">
              <h3 className="font-bold text-3xl">Register</h3>
              <RegisterForm fetcher={fetch} reload={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
