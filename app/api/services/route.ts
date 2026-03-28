import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sanitizeSlug } from '@/lib/slug'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        packages: true
      }
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, icon, image, packages } = body
    const slug = sanitizeSlug(body.slug || '')
    if (!slug) return NextResponse.json({ error: 'Slug invalid' }, { status: 400 })

    const service = await prisma.service.create({
      data: {
        slug,
        title,
        description,
        icon,
        image,
        packages: {
          create: packages
        }
      },
      include: {
        packages: true
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}