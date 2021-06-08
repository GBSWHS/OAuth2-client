import Image from 'next/image'

export default function Logo () {
  return (
    <a
      target="about:blank"
      title="학교 사이트로 이동"
      className="absolute -top-8 -right-8 transform transition-all duration-700 ease-out hover:rotate-6 hover:opacity-70 z-0 opacity-40"
      href="http://gbsw.school.gyo6.net">
      <Image
        width="150"
        height="150"
        src="/img/symbol-only.png"
        alt="경북소프트웨어고등학교 로고"/>
    </a>
  )
}
