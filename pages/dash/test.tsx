import useSWR from 'swr'
import Link from 'next/link'
import moment from 'moment'
import router from 'next/router'
import { useState, useEffect } from 'react'

const fetcher = (url: string) =>
  window.fetch(url, { headers: {
    Authorization: 'Bearer ' + window?.localStorage?.getItem?.('token') || ''
  }}).then(res => res.json())

const TestPage = () => {
  useEffect(() => {
    if (!window.localStorage.getItem('token'))
      router.push('/login')
  })
  const { data, error } = useSWR('/api/me', fetcher)

  const [user, setUser] = useState({
    id: '',
    email: '',
    passwd: '',
    nickname: ''
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-2 items-center cursor-default">
        <img src="/img/logo.png" className="h-8" />
        <h1 className="text-2xl font-semibold uppercase text-gbswhs2">my account</h1>
      </div>
      <div>
        <Link href={'/logout'} passHref>
          <div className="w-full px-4 py-4 rounded-lg shadow-gbsw1 transform hover:shadow-gbsw2 mt-6 flex justify-center items-center gap-2">
            <img src={data?.user?.student?.image} className="h-16 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold uppercase text-gbswhs2">{data?.user?.realname} / {data?.user?.nickname}</h2>
              <p className="text-sm text-gray-600">{data?.user?.email}</p>
            </div>
          </div>
        </Link>
        <div className="md:flex gap-3">
          <div className="w-full md:w-1/2 px-4 py-4 rounded-lg shadow-xl mt-6">
            <div className="w-full px-4 py-4 mt-6 border-l-2 border-gbswhs2">
              <h2 className="text-xl font-semibold uppercase text-gbswhs2">계정 정보</h2>
              <p>이름: {data?.user?.realname}</p>
              <p>닉네임: {data?.user?.nickname}</p>
              <p>성별: {data?.user?.gender ? '남' : '여'}자</p>
              <p>그룹: {data?.user?.group?.name}</p>
              <p>고유번호: {data?.user?.ident}</p>
              <p>계정 생성일: {moment(data?.user?.createdAt).format("YYYY-MM-DD hh:mm:ss")}</p>
            </div>
            <div className="w-full px-4 py-4 mt-6 border-l-2 border-gbswhs2">
              <h2 className="text-xl font-semibold uppercase text-gbswhs2">학생 정보</h2>
              <p>학년: {data?.user?.student?.grade}학년</p>
              <p>반: {data?.user?.student?.class}반</p>
              <p>번호: {data?.user?.student?.number}번</p>
              <p>기숙사 방: {data?.user?.student?.room}호</p>
              <p>휴대폰 번호: 0{data?.user?.student?.phone}</p>
              <p>주소: {data?.user?.student?.address}</p>
              <small className="animate-pulse font-bold">틀린정보가 있다면 1학년 1반 임태현에게 문의해주세요.</small>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 py-4 rounded-lg shadow-xl mt-6">
            <h2 className="text-xl font-semibold uppercase text-gbswhs2">정보 수정</h2>
            <form>
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm font-semibold text-gray-600">아이디</label>
                <input className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-200" placeholder={data?.user?.id} type="text" />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-semibold text-gray-600">닉네임</label>
                <input className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-200" placeholder={data?.user?.nickname} type="text" />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-semibold text-gray-600">이메일</label>
                <input className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-200" placeholder={data?.user?.email} type="email" />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-semibold text-gray-600">비밀번호</label>
                <input className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-200" placeholder={data?.user?.email} type="password" />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-semibold text-gray-600">비밀번호 확인</label>
                <input className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-200" placeholder={data?.user?.email} type="password" />
              </div>
              <button type='submit' className="w-full px-4 py-2 text-sm text-white rounded-lg bg-gbswhs2 mt-4">수정</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage
