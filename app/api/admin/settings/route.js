import { NextResponse } from 'next/server'

// In-memory storage (use database in production)
let settings = {
  siteName: 'ELNILE Aluminum',
  siteDescription: 'شركة النيل للألوميتال',
  logo: '/logo.png',
  favicon: '/favicon.ico',
}

export async function GET() {
  try {
    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأ في جلب الإعدادات' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const siteName = formData.get('siteName')
    const siteDescription = formData.get('siteDescription')
    const logoFile = formData.get('logo')
    const faviconFile = formData.get('favicon')

    // Update settings
    if (siteName) settings.siteName = siteName
    if (siteDescription) settings.siteDescription = siteDescription

    // In production, upload files to Cloudinary or similar service
    // For now, we'll simulate the update
    if (logoFile) {
      // Simulate file upload
      settings.logo = '/logo-updated.png'
    }
    if (faviconFile) {
      // Simulate file upload
      settings.favicon = '/favicon-updated.ico'
    }

    return NextResponse.json(
      { message: 'تم حفظ الإعدادات بنجاح', settings },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { message: 'خطأ في تحديث الإعدادات' },
      { status: 500 }
    )
  }
}
