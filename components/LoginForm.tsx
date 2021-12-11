import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { ChangeEvent, createRef, FormEvent, useState } from 'react'

const setState = (fn: any) =>
  (ev: ChangeEvent<HTMLInputElement>) => fn(ev.target.value)

export default function LoginForm ({ fetcher, reload }) {
  const router = useRouter()

  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')

  // const recaptchaRef = createRef<ReCAPTCHA>()

  // async function onSubmit (ev: FormEvent) {
    //   // recaptchaRef.current.execute()
  //   if (process.env.NEXT_PUBLIC_SKIP_CAPTCHA) onReCAPTCHAChange('')
  // }
  
  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    const res = await fetcher('/internal/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id, password
      })}).then((res) => res.json())
  
    // recaptchaRef.current.reset()
    
    if (!res.success) {
      toast.error(res.error_description)
      return
    }
  
    window.localStorage.setItem('token', res.token)
    reload ? router.reload() : router.push('/dash')
  }

  return (
    <form onSubmit={onSubmit}>
      {/* <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      /> */}

      {error ? (
        <div className="border-t-4 border-red-500 p-3 bg-red-100 rounded text-center">
          {error}
        </div>
      ): <></>}

      <input value={id} onChange={setState(setId)} className="mt-6 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="text" id="id" placeholder="아이디를 입력하세요" autoComplete="off"/>
      <input value={password} onChange={setState(setPassword)} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="password" id="password" name="password" autoComplete="current-password" placeholder="비밀번호를 입력하세요"/>

      <button className="mt-3 font-bold bg-gbswhs2 text-white rounded px-3 py-2" type="submit">로그인</button>
      <Link href="/register"><button className="mt-3 font-bold bg-gbswhs2 text-white rounded px-3 py-2 ml-3" type="button">회원가입</button></Link>
    </form>
  )
}
