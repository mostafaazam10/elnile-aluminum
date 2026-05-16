import { NextResponse } from 'next/server'

// In-memory storage
let heroImages = [
  { id: 1, url: '/hero1.jpg' },
  { id: 2, url: '/hero2.jpg' },
  { id: 3, url: '/hero3.jpg' },
]

export async function POST(request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image')
    const type = formData.get('type')

    if (!imageFile) {
      return NextResponse.json(
        { message: 'لم يتم اختيار صورة' },
        { status: 400 }
      )
    }

    // In production, upload to Cloudinary
    // For now, simulate upload
    const imageUrl = `/uploaded-${Date.now()}.jpg`

    if (type === 'hero') {
      heroImages.push({
        id: Date.now(),
        url: imageUrl,
      })
    }

    return NextResponse.json(
      { message: 'تم تحميل الصورة بنجاح', url: imageUrl },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'خطأ في تحميل الصورة' },
      { status: 500 }
    )
  }
}
