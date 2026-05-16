import { NextResponse } from 'next/server'

// Demo endpoint for hero images
let heroImages = [
  { id: 1, url: '/hero1.jpg' },
  { id: 2, url: '/hero2.jpg' },
  { id: 3, url: '/hero3.jpg' },
]

export async function GET() {
  try {
    return NextResponse.json({ images: heroImages.map((img) => img.url) }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في جلب الصور' },
      { status: 500 }
    )
  }
}
