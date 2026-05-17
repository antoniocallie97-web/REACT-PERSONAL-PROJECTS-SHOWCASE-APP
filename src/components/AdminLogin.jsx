import { useState } from 'react'
import './AdminLogin.css'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

function AdminLogin({ onAuthenticate }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password === ADMIN_PASSWORD) {
      setError('')
      onAuthenticate()
      return
    }

    setError('Incorrect password. Please try again.')
    setPassword('')
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Please enter the admin password to access the portal.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoFocus
          />
          <button type="submit">Enter Portal</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
