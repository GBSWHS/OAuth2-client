import Head from 'next/head'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>경소고 통합로그인 서비스</title>
      </Head>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
