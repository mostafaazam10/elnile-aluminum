import { NextResponse } from 'next/server'

// In-memory storage
let services = [
  {
    id: 1,
    title: 'شبابيك ألوميتال',
    description: 'شبابيك عصرية وآمنة بأعلى جودة وتصاميم متنوعة',
  },
  {
    id: 2,
    title: 'مطابخ ألوميتال',
    description: 'مطابخ فاخرة مع ألوميتال متين وتصاميم حديثة',
  },
  {
    id: 3,
    title: 'مطابخ خشب',
    description: 'مطابخ خشبية فخمة بجودة عالية وتشطيب احترافي',
  },
  {
    id: 4,
    title: 'Dressing Rooms',
    description: 'غرف ملابس فاخرة مع أنظمة تنظيم متقدمة',
  },
  {
    id: 5,
    title: 'أبواب وواجهات',
    description: 'أبواب وواجهات زجاجية بتصاميم عصرية وآمنة',
  },
]

export async function GET() {
  try {
    return NextResponse.json({ services }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في جلب الخدمات' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const { id, title, description } = await request.json()

    services = services.map((service) =>
      service.id === id ? { id, title, description } : service
    )

    return NextResponse.json(
      { message: 'تم تحديث الخدمة بنجاح', services },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في تحديث الخدمة' },
      { status: 500 }
    )
  }
}
