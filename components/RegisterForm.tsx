import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { ChangeEvent, createRef, FormEvent, useState } from 'react'

const setState = (fn: any) =>
  (ev: ChangeEvent<HTMLInputElement>) => fn(ev.target.value)

export default function LoginForm ({ fetcher }) {
  const router = useRouter()

  const [step, setStep] = useState(false)
  const [left, setLeft] = useState(Date.now())
  const [user, setUser] = useState({
    grade: '', uclass: '', number: '', id: '', name: '', email: '', password: '',
    password_confirm: '', phone: 0, code: '', nickname: ''
  })

  // const recaptchaRef = createRef<ReCAPTCHA>()

  // async function onSubmit (ev: FormEvent) {
    //   // recaptchaRef.current.execute()
  //   if (process.env.NEXT_PUBLIC_SKIP_CAPTCHA) onReCAPTCHAChange('')
  // }
  
  async function onSubmit (ev: FormEvent) {
    ev.preventDefault()
    const res = await fetcher('/internal/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then((res) => res.json())
  
    // recaptchaRef.current.reset()
    
    if (!res.success) {
      toast.error(res.error_description)
      return
    }
  
    router.push('/login?msg=register successfull')
  }

  async function onCheck (ev: FormEvent) {
    ev.preventDefault()
    const res = await fetcher('/internal/register/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then((res) => res.json())
  
    if (!res.success) {
      toast.error(res.error_description)
      setStep(false)
      setLeft(res.enddate)
      return
    }
    setStep(true)
  }

  return (
    <div>
      <form onSubmit={onCheck} className={step ? 'hidden' : ''}>
        <div className="flex gap-3">
          <input onChange={(e) => setUser({...user, grade: e.target.value})} className="mt-6 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="number" id="grade" placeholder="??????" autoComplete="off"/>
          <input onChange={(e) => setUser({...user, uclass: e.target.value})} className="mt-6 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="number" id="class" placeholder="???" autoComplete="off"/>
          <input onChange={(e) => setUser({...user, number: e.target.value})} className="mt-6 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="number" id="number" placeholder="??????" autoComplete="off"/>
        </div>
        <input onChange={(e) => setUser({...user, name: e.target.value})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="text" placeholder="??????"/>
        <input onChange={(e) => setUser({...user, phone: Number(e.target.value)})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="tel" pattern="010[0-9]{4}[0-9]{4}" placeholder="????????????"/>
        <div className="flex gap-2">
          <button className="mt-3 font-bold bg-gbswhs2 text-white rounded px-3 py-2" type="submit">???????????? ?????? </button>
          <Link href="/login"><button className="mt-3 font-bold bg-gbswhs2 text-white rounded px-3 py-2" type="submit">????????? ?????????</button></Link>
        </div>
      </form>
      <form className={!step ? 'hidden' : ''} onSubmit={onSubmit}>
        <input onChange={(e) => setUser({...user, id: e.target.value})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="text" placeholder="?????????"/>
        <input onChange={(e) => setUser({...user, nickname: e.target.value})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="text" placeholder="?????????"/>
        <input onChange={(e) => setUser({...user, email: e.target.value})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="email" placeholder="?????????"/>
        <input onChange={(e) => setUser({...user, password: e.target.value})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$" required type="password" placeholder="????????????"/>
        <small className="text-xs text-gray-500">?????? ????????? ?????? ????????????(#?!@$%^&*-) ??? ??????????????? ?????????.</small>
        <input onChange={(e) => setUser({...user, password_confirm: e.target.value})} className="mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2" required type="password" placeholder="???????????? ?????? ??????"/>
        
        <input onChange={(e) => setUser({...user, code: e.target.value})} className={"mt-3 block w-full border-b-2 border-gry-200 px-3 py-2 focus:border-gbswhs2"} required type="text" placeholder="????????????"/>
        <div className="flex gap-2">
          <button className="mt-3 font-bold bg-gbswhs2 text-white rounded px-3 py-2 mr-2" type="submit">????????????</button>
          <Link href="/login"><button className="mt-3 font-bold bg-gbswhs2 text-white rounded px-3 py-2 ml-1" type="submit">????????? ?????????</button></Link>
          <button className='text-xs' onClick={(e) => setStep(false)} type="button">???????????? ?????????</button>
        </div>
      </form>
    </div>
  )
}
