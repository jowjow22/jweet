'use server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { userSchema } from "@/models/User"
import { redirect } from "next/navigation"


export async function verifySession() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return false
  }

  return session
}

export async function getUserSession() {
  
  const session = await getServerSession(authOptions)

  return userSchema.parse(session?.user)
}

export async function redirectIfAuthenticated() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/home")
  }
}