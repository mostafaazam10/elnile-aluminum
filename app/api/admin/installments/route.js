import { NextResponse } from 'next/server'

// In-memory storage
let installmentData = {
  installments: [
    {
      duration: '12',
      interest: '0%',
      advance: '0%',
      admin: '0%',
    },
  ],
}

export async function POST(request) {
  try {
    const { installments } = await request.json()

    if (installments && Array.isArray(installments)) {
      installmentData.installments = installments
    }

    return NextResponse.json(
      { message: 'تم حفظ خطط التقسيط بنجاح', installmentData },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في حفظ خطط التقسيط' },
      { status: 500 }
    )
  }
}
