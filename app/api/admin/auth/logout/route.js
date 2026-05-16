import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const response = NextResponse.json(
    { message: 'تم تسجيل الخروج بنجاح' },
    { status: 200 }
  )

  response.cookies.delete('adminToken')

  return response
}
