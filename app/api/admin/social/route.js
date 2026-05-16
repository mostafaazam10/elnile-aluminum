import { NextResponse } from 'next/server'

// In-memory storage
let socialData = {
  socialLinks: {
    facebook: 'https://www.facebook.com/share/1ZE1EWNhxQ/',
  },
}

export async function POST(request) {
  try {
    const { socialLinks } = await request.json()

    if (socialLinks) {
      socialData.socialLinks = { ...socialData.socialLinks, ...socialLinks }
    }

    return NextResponse.json(
      { message: 'تم حفظ روابط التواصل الاجتماعي بنجاح', socialData },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في حفظ روابط التواصل الاجتماعي' },
      { status: 500 }
    )
  }
}
