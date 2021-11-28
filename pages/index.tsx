import Link from 'next/link'
import { NextPage } from 'next'
import Title from '../components/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons'

const Login: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full justify-center items-center">
        <div className="lg:w-3/12 md:w-4/12 sm:w-5/12 w-full mx-2">
          <div className="mb-3">
            <Title />
          </div>
          <div className="shadow-2xl rounded-lg">
            <div className="p-10 w-full">
              <Link href="/dash" passHref>
                <span className='bg-red-300 hover:bg-red-400 text-white p-3 w-full rounded-lg mt-2 flex items-center cursor-pointer'>
                  <FontAwesomeIcon icon={faSearch} className='mr-2' />
                  <span>내 애플리케이션 보기</span>
                </span>
              </Link>
              <Link href="/docs" passHref>
                <span className='bg-blue-300 hover:bg-blue-400 text-white p-3 w-full rounded-lg mt-2 flex items-center cursor-pointer'>
                  <FontAwesomeIcon icon={faBook} className='mr-2' />
                  <span>개발 방법 살펴보기</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
