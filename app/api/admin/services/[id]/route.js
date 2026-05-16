import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    // In production, delete from database
    return NextResponse.json(
      { message: 'تم حذف الخدمة بنجاح' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في حذف الخدمة' },
      { status: 500 }
    )
  }
}
