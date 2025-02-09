import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      console.log('Please fill in all fields')
    }

    console.log('email', email)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className=" p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-center mb-4">Signup</h1>
        <form className="space-y-3 flex flex-col w-full">
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md border-b-2 border-white  hover:bg-gray-400 hover:transition-transform  transition"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login">
              {' '}
              <span className="text-blue-500 cursor-pointer">Login</span>{' '}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
