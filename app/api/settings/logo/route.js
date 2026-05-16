import { NextResponse } from 'next/server'

const logoData = {
  logo: '/logo.png',
}

export async function GET() {
  try {
    return NextResponse.json(logoData, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في جلب الشعار' },
      { status: 500 }
    )
  }
}
