import router from "next/router"

const logout = () => {
  window.localStorage.setItem('token', '')
  router.push('/')

  return (
    <div>로그아웃중</div>
  )
}

export default logout
