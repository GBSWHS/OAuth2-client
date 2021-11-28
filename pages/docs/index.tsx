import Head from "../../components/Head"

import Link from "next/link"
import Container from "../../components/docs/Container"

const Docs = () =>
  <div className="w-screen h-screen">
    <Head description="개발자용 문서"/>
    <Container>
      <div className="text-center flex justify-center items-center h-screen">
        <div>
          <h2 className="font-thin text-lg">경북소프트웨어고등학교 통합 로그인 시스템</h2>
          <h3 className="font-bold text-4xl">개발자용 문서</h3>

          <div className="mt-5">
            <p className="text-gbswhs6">문서 종류를 선택하세요</p>
            <div className="flex flex-wrap justify-center gap-5 mt-3">
              <Link href="/docs/external">
                <div className="p-10 bg-white shadow rounded max-w-xs hover:shadow-none hover:border-opacity-100 border border-opacity-0 cursor-pointer">
                  <h4 className="text-xl font-bold border-b-2 border-gbswhs3 mb-3 p-2">External 개발자용</h4>
                  <p className="font-light">로그인 시스템을 자신의 어플리케이션에 적용하고 싶은 개발자</p>
                </div>
              </Link>
              {/* <Link href="/docs/internal"> */}
                <div className="p-10 bg-gray-200 shadow rounded max-w-xs border border-opacity-0 cursor-not-allowed">
                  <h4 className="text-xl font-bold border-b-2 border-gbswhs5 mb-3 p-2">Internal 개발자용</h4>
                  <p className="font-light">로그인 시스템을 유지보수하거나 보안을 개선하고자 하는 개발자</p>
                </div>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>

export default Docs
