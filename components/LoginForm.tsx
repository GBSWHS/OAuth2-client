import { useRouter } from 'next/router'
import { ChangeEvent, createRef, FormEvent, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const setState = (fn: any) =>
  (ev: ChangeEvent<HTMLInputElement>) => fn(ev.target.value)

export default function LoginForm () {
  const router = useRouter()

  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')

  const recaptchaRef = createRef<ReCAPTCHA>()

  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    recaptchaRef.current.execute()
    if (process.env.NEXT_PUBLIC_SKIP_CAPTCHA) onReCAPTCHAChange('')
  }

  async function onReCAPTCHAChange (captcha: string) {
    const res = await fetch('/internal/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id, password, captcha
      })}).then((res) => res.json())
  
    recaptchaRef.current.reset()
    
    if (!res.success) {
      setError(res.message)
      return
    }
  
    window.localStorage.setItem('token', res.token)
    router.reload()
  }

  return (
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
      
      <label htmlFor="id" className="relative top-3 left-3 bg-white">학번</label>
      <input value={id} onChange={setState(setId)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" required type="text" id="id" placeholder="학번를 입력하세요" autoComplete="off"/>

      <label htmlFor="password" className="relative top-3 left-3 bg-white">비밀번호</label>
      <input value={password} onChange={setState(setPassword)} className="block border-0 w-full max-w-xs outline-gray focus:outline-none focus:shadow rounded px-3 py-2" required type="password" id="password" name="password" autoComplete="current-password" placeholder="비밀번호를 입력하세요"/>

      <button className="mt-3 border-0 font-bold bg-gbswhs6 text-white rounded px-3 py-2" type="submit">로그인</button><span className="ml-5">&copy; gbswhs. 2021.</span>
    </form>
  )
}
