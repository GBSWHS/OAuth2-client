import NextHead from 'next/head'

export default function Head () {
  return (
    <NextHead>
      <link rel="shortcut icon" href="favicon.png" type="image/png"/>
      <title>경북소프트웨어고 통합 로그인 시스템</title>
      <meta name="theme-color" content="#65C2E4"/>
      <meta name="twitter:card" content="summary"/>
      <meta name="og:site_name" content="경북소프트웨어고등학교"/>
      <meta property="og:description" content=""/>
      <meta property="og:title" content="통합 로그인 시스템"/>
      <meta property="og:image" content="/img/symbol-only.png"/>
    </NextHead>
  )
}
