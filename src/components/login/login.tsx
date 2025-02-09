import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Link } from 'react-router-dom'

import { signInUser } from '@/utils/supabase/functions'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user_data')
    if (user) {
      navigate('/company-dashboard')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      console.log('Please fill in all fields')
    }

    const data = await signInUser(email, password)
    console.log('data', data)

    if (!data) {
      console.log('Error signing up')
      setError('Error signing up')
      return
    }

    localStorage.setItem('user_data', JSON.stringify(data))
    navigate('/company-dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className=" p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-3 flex flex-col w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md border-b-2 border-white  hover:bg-gray-400 hover:transition-transform  transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/signup">
              {' '}
              <span className="text-blue-500 cursor-pointer">Sign up</span>{' '}
            </Link>
          </p>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  )
}
