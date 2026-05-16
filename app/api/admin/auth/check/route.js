import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_here'

export async function GET() {
  try {
    const cookiesList = await cookies()
    const token = cookiesList.get('adminToken')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    return NextResponse.json(
      { authenticated: true, user: decoded },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
