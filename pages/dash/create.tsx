import Head from '../../components/Head'

import Link from 'next/link'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { ChangeEvent, createRef, FormEvent, useState } from 'react'

const setState = (fn: any) =>
  (ev: ChangeEvent<HTMLInputElement>) => fn(ev.target.value)

export default function DashCreate () {
  const router = useRouter()

  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [error, setError] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [redirect_uri, setRedirect_uri] = useState('')

  const recaptchaRef = createRef<ReCAPTCHA>()

  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    recaptchaRef.current.execute()
    if (process.env.NEXT_PUBLIC_SKIP_CAPTCHA) onReCAPTCHAChange('')
  }

  async function onReCAPTCHAChange (captcha: string) {
    const res = await fetch('/internal/clients', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('dash_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, icon, website, description, redirect_uri, captcha
      })}).then((res) => res.json())
  
    recaptchaRef.current.reset()
    
    if (!res.success) {
      setError(res.message)
      return
    }
  
    router.push('/dash')
  }

  return (
    <div>
      <Head description="클라이언트 생성"/>
      <form onSubmit={onSubmit}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onReCAPTCHAChange}
        />

        {error ? (
          <div className="border-t-4 border-red-500 p-3 mt-5 bg-red-100 rounded text-center">
            {error}
          </div>
        ): <></>}      
        
        <label htmlFor="name" className="relative top-3 left-3 bg-white">서비스 이름 (필수)</label>
        <input value={name} onChange={setState(setName)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" required type="text" id="name" placeholder="서비스 이름을 입력하세요" autoComplete="off"/>

        <label htmlFor="description" className="relative top-3 left-3 bg-white">서비스 설명</label>
        <input value={description} onChange={setState(setDescription)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" type="text" id="description" placeholder="서비스 설명을 입력하세요" autoComplete="off"/>

        <label htmlFor="icon" className="relative top-3 left-3 bg-white">서비스 아이콘</label>
        <input value={icon} onChange={setState(setIcon)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" type="url" id="icon" placeholder="서비스 아이콘 주소를 입력하세요" autoComplete="off"/>
        <img src={icon} />

        <label htmlFor="website" className="relative top-3 left-3 bg-white">대표 웹사이트</label>
        <input value={website} onChange={setState(setWebsite)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" type="url" id="website" placeholder="대표 웹사이트 주소를 입력하세요" autoComplete="off"/>

        <label htmlFor="redirect_uri" className="relative top-3 left-3 bg-white">리다이렉트 주소 (필수)</label>
        <input value={redirect_uri} onChange={setState(setRedirect_uri)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" required type="url" id="redirect_uri" placeholder="사용자 정보를 받을 리다이렉트 주소를 입력하세요" autoComplete="off"/>

        <button className="mt-3 border-0 font-bold bg-gbswhs6 text-white rounded px-3 py-2" type="submit">생성</button>
        <Link href="/dash"><button className="mt-3 border-0 bg-gray-600 text-white rounded px-3 py-2" type="submit">돌아가기</button></Link>
      </form>
    </div>
  )
}
