import './Header.scss'
import EthLogo from '../../assets/ethereum.svg?react'
export default function Header() {
  console.log(EthLogo)
  return (
    <div className="title-bar">
      <EthLogo className="logo" />
      <p className="name">Wallet Hunter</p>
    </div>
  )
}
