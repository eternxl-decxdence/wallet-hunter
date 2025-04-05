import './LoginPage.scss'
import LoginForm from '@renderer/components/LoginForm/LoginForm'
import { Dispatch, SetStateAction } from 'react'
export default function LoginPage({
  user,
  setUser
}: {
  user: string
  setUser: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="login-page">
      <LoginForm user={user} setUser={setUser} />
    </div>
  )
}
