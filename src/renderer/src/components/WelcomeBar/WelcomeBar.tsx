import api from '../../api/api'

export default function WelcomeBar({ user }: { user: string }) {
  return (
    <div className="welcome-bar">
      <p className="welcome-message">
        Welcome back, <p className="higlight-username">{user}</p>
      </p>
      <div className="date-time-wrapper">
        <p className="date"></p>
        <p className="time"></p>
      </div>
    </div>
  )
}
