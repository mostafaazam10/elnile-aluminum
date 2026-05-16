import { NextResponse } from 'next/server'

// In-memory storage
let contactData = {
  phoneNumbers: [
    '01150008855',
    '01099724612',
    '01111768954',
    '01020606300',
    '01101043475',
    '01220002097',
  ],
}

export async function GET() {
  try {
    return NextResponse.json(contactData, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في جلب بيانات التواصل' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const { phoneNumbers } = await request.json()

    if (phoneNumbers && Array.isArray(phoneNumbers)) {
      contactData.phoneNumbers = phoneNumbers
    }

    return NextResponse.json(
      { message: 'تم حفظ بيانات التواصل بنجاح', contactData },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في حفظ بيانات التواصل' },
      { status: 500 }
    )
  }
}
