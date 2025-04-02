import api from '../../api/api'
import { FormEvent, useState } from 'react'

import './LoginForm.scss'
import EthLogoSVG from '../../assets/ethereumlogo.png'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', response.data.token)
      window.location.href = '/main'
    } catch (err: any) {
      setError(err.response?.data?.message || 'Auth Error')
    }
  }

  return (
    <div className="login-form">
      <div className="logo">
        <p className="title">Wallet Hunter</p>
        <img src={EthLogoSVG} className="ethereum-logo" />
      </div>
      <form className="form-wrapper" onSubmit={handleLogin}>
        <input
          className="form-input"
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form-button">
          Sign In
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}
