import { NextResponse } from 'next/server'

const contactData = {
  phoneNumbers: [
    '01150008855',
    '01099724612',
    '01111768954',
    '01020606300',
    '01101043475',
    '01220002097',
  ],
  socialLinks: {
    facebook: 'https://www.facebook.com/share/1ZE1EWNhxQ/',
  },
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
