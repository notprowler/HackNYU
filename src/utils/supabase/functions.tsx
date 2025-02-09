import { supabase } from './client'

//declare user type
type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return { data }
}

// function to add a new row to the users table
export async function insertUser(user: User) {
  const { data, error } = await supabase.from('users').insert([user])

  if (error) throw error
  return data
}

// function to add a new user using supabase auth
export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}
