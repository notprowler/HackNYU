import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { insertUser, signUpUser } from '@/utils/supabase/functions'
import { useNavigate } from 'react-router'

type User = {
  userId: string
  firstName: string
  lastName: string
  email: string
  password: string
}

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user_data')
    if (user) {
      navigate('/company-dashboard')
    }
  }, [])

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    //first sign up the user in supabase auth
    const signupData = await signUpUser(email, password)

    //if signup is successful insert the user into the users table
    if (!signupData) {
      alert('Error signing up')
      return
    }

    const userId: string = signupData.user?.id || ''

    const user: User = {
      userId,
      email,
      password,
      firstName,
      lastName,
    }

    const data = await insertUser(user)

    if (!data) {
      alert('Error signing up')
      return
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className=" p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-center mb-4">Signup</h1>
        <form onSubmit={(e) => handleSignup(e)} className="space-y-3 flex flex-col w-full">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            className="w-full px-4 py-2 border rounded-md "
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="w-full px-4 py-2 border rounded-md "
            onChange={(e) => setLastName(e.target.value)}
          />

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
