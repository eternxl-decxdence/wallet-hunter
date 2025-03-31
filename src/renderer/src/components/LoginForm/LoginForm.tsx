import './LoginForm.scss'
import EthLogoSVG from '../../assets/ethereumlogo.png'

export default function LoginForm() {
  return (
    <div className="login-form">
      <div className="logo">
        <p className="title">Wallet Hunter</p>
        <img src={EthLogoSVG} className="ethereum-logo" />
      </div>
      <div className="form-wrapper">
        <input className="form-input" type="text" placeholder="Username..." />
        <input className="form-input" type="password" placeholder="Password..." />
        <button className="form-button"> Sign In</button>
      </div>
    </div>
  )
}
