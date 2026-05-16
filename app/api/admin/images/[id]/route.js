import { NextResponse } from 'next/server'

// In-memory storage
let heroImages = [
  { id: 1, url: '/hero1.jpg' },
  { id: 2, url: '/hero2.jpg' },
  { id: 3, url: '/hero3.jpg' },
]

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    heroImages = heroImages.filter((img) => img.id !== id)

    return NextResponse.json(
      { message: 'تم حذف الصورة بنجاح' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في حذف الصورة' },
      { status: 500 }
    )
  }
}
