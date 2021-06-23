import Head from "../../components/Head"
import Logo from "../../components/Logo"
import Title from "../../components/docs/Title"
import CodeBlock from "../../components/docs/CodeBlock"
import Container from "../../components/docs/Container"
import SectionSub from "../../components/docs/SectionSub"
import SectionTitle from "../../components/docs/SectionTitle"

import Link from "next/link"
import Image from "next/image"

const Docs = () =>
  <div className="w-screen h-screen overflow-y-scroll">
    <Head description="개발자용 문서 (external)"/>
    <Logo />
    <Container>
      <Title>응용 개발자용 문서</Title>
      <p>이 문서는 어플리케이션 개발자가 <b>경북소프트웨어고등학교 통합 로그인 시스템</b>을 응용하는 법을 설명합니다.</p>
      <br />

      <SectionTitle>설명</SectionTitle>
      <p>이 시스템은 경북 소프트웨어 고등학교 학생들이 제작한 웹 사이트들의 아이디, 비밀번호 통합을 위해 제작되었습니다.</p>
      <br />
      <p>이 시스템은 간략화된 OAuth2 방식을 사용합니다. 추후 업데이트를 통해 변경될 수 있습니다.</p>
      <p>비밀번호 암호화로 SHA-256 with Salt 방식을 사용합니다. <span className="text-gbswhs6">2022년부터 SHA3으로 변경될 예정입니다.</span></p>

      <br />

      <SectionTitle>원리</SectionTitle>
      <p>시스템 원리는 다음과 같습니다:</p>
      <div className="border-2 border-gbswhs3 p-10 inline-block bg-white">
        <Link href="/img/workflow.png">
          <Image src="/img/workflow.png" width="550" height="400"/>
        </Link>
      </div>
      
      <br />
      <br />

      <ul>
        <li>① 사용자가 로그인 서비스에 접속해 로그인을 진행합니다.</li>
        <li>② 로그인 서비스는 사용자에게 내 서버로 인증 코드를 보내도록 명령합니다.</li>
        <li>③ 사용자는 내 서버에 인증 코드를 보내 명령을 수행합니다.</li>
        <li>④ 내 서버는 검증을 위해 받은 인증 코드를 로그인 서비스에 보냅니다.</li>
        <li>⑤ 로그인 서비스는 검증을 진행하고 사용자 식별 정보를 내 서버에 전송해 줍니다.</li>
        <li>⑥ 내 서버는 사용자 식별 정보를 통해 사용자를 특정하고 사용자에게 세션을 제공합니다.</li>
      </ul>

      <br />

      <SectionTitle>구현</SectionTitle>
      <p>클라이언트 ID & Secret 생성 및 리다이렉트 주소 설정은 <Link href="/dash"><span className="border-b-2 border-gbswhs4 hover:border-gbswhs3 cursor-pointer">대시보드</span></Link>에서 하실 수 있습니다.</p>
      <br />
      <strong className="text-gbswhs6">경고! 생성한 클라이언트 Secret을 외부로 유출하지 마시오</strong>
      <br />
      <br />

      <SectionSub>1. 로그인 요청</SectionSub>
      <p>당신의 사용자가 다음 주소에 접속하도록 유도하십시오:</p>
      <CodeBlock>https://auth.gbsw.hs.kr/auth?client_id=<i className="text-gbswhs6">&lt;클라이언트ID&gt;</i>&redirect_uri=<i className="text-gbswhs6">&lt;리다이렉트주소&gt;</i>&response_type=code</CodeBlock>
      <br />

      <p>버튼이든, 리다이렉트든 상관없이 접속하도록 하게만 하면 됩니다.</p>
      <p>예를 들면 다음과 같습니다:</p>
      <CodeBlock>
        &lt;a href="https://auth.gbsw.hs.kr/auth?client_id=<i className="text-gbswhs6">1624419862</i>&redirect_uri=<i className="text-gbswhs6">https://outgo.intraedu.kr/callback</i>&response_type=code"&gt;이동&lt;/a&gt;
      </CodeBlock>

      <br />
      <p>해당 주소에 접속한 사용자는 로그인을 진행하게 됩니다.</p>

      <br />

      <SectionSub>2. 인증 코드 받기</SectionSub>
      <p>로그인에 성공한 사용자는 다음과 같은 주소로 접속하게 됩니다.</p>
      <CodeBlock>
        <p>GET <i className="text-gbswhs6">리다이렉트주소</i>?code=<i className="text-gbswhs6">인증코드</i></p>
        <br />
        <p>예시) 리다이렉트 주소가 <i className="font-mono">https://outgo.intraedu.kr/callback</i>인 경우:</p>
        <p>GET https://outgo.intraedu.kr/callback?code=<i className="text-gbswhs6">BypPoXarXD9CdxoM2N4nEjCaTABH8cDZ</i></p>
      </CodeBlock>

      <br />

      <p>사용자로부터 인증 코드를 받기 위해 위에서 입력한 리다이렉트 주소의 대한 접속 가능한 엔드포인트를 생성하십시오:</p>
      <CodeBlock>
        <p>예시) 리다이렉트 주소가 <i className="font-mono">http://.../callback</i>인 경우:</p>
        <p>app.get('/callback', function (req, res) &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;const code = req.query.code <i className="text-green-600">// 인증코드</i></p>
        <p>&#125;</p>
      </CodeBlock>

      <br />

      <SectionSub>3. 사용자 정보 얻기</SectionSub>
      <p>다음과 같이 API를 서버에서 요청하십시오:</p>
      <CodeBlock>
        <p>POST https://auth.gbsw.hs.kr/api/ident</p>
        <p>Content-Type: application/json</p>
        <br />
        <p>&#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"code": "<i className="text-gbswhs6">인증코드</i>",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"client_id": "<i className="text-gbswhs6">클라이언트ID</i>",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"client_secret": "<i className="text-gbswhs6">클라이언트Secret</i>",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"redirect_uri": "<i className="text-gbswhs6">리다이렉트주소</i>",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"grant_type": "authorization_code"</p>
        <p>&#125;</p>
      </CodeBlock>

      <br />
      <p>정상적인 요청인경우 다음과 같이 응답됩니다.</p>
      <CodeBlock>
        <p>200 OK</p>
        <p>Content-Type: application/json</p>
        <br />
        <p>&#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"success": true,</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"message": "",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;"user": &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "<i className="text-gbswhs6">학번</i>",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"grade": <i className="text-gbswhs6">학년</i>,</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class": <i className="text-gbswhs6">반</i>,</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"class_number": <i className="text-gbswhs6">번호</i>,</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"room_number": <i className="text-gbswhs6">기숙사방번호</i>,</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "<i className="text-gbswhs6">실명</i>",</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"nickname": "<i className="text-gbswhs6">닉네임</i>"</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</p>
        <p>&#125;</p>
      </CodeBlock>

      <br />
      <SectionTitle>도움받기</SectionTitle>
      <p>이메일을 통해 도움 받을 수 있습니다:</p>
      <p>1기 입학생 박민혁 &lt;pmhstudio.pmh@gmail.com&gt;</p>

      <br />
      <p>혹은 깃허브 이슈를 통해 도움 받을 수 있습니다:</p>
      <a className="border-b-2 border-gbswhs4 hover:border-gbswhs3 cursor-pointer" href="https://github.com/GBSWHS/OAuth2/issues/new">github.com/GBSWHS/OAuth2</a>
    </Container>
  </div>

export default Docs
