import Link from "next/link"

const Container = ({ children }) =>
  <div className="container mx-auto px-16 sm:px-32 py-10">
    <Link href="/docs"><p className="absolute top-5 left-5 border-b-2 border-gbswhs4 hover:border-gbswhs3 cursor-pointer">&lt; 돌아가기</p></Link>
    {children}
  </div>

export default Container
