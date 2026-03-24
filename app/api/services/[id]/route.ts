import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        packages: true
      }
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { slug, title, description, icon, image, packages } = await request.json()

    // Delete existing packages
    await prisma.package.deleteMany({
      where: { serviceId: id }
    })

    // Sanitize packages – only keep fields the schema accepts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanPackages = (packages ?? []).map((p: any) => ({
      name: p.name,
      kw: Number(p.kw) || 0,
      price: Number(p.price) || 0,
      popular: Boolean(p.popular),
      description: p.description || '',
      features: p.features ?? [],
      products: (p.products ?? []).map((pr: any) => ({
        name: pr.name,
        spec: pr.spec || '',
        quantity: Number(pr.quantity) || 0,
        unit: pr.unit || 'buc',
        unitPrice: Number(pr.unitPrice) || 0,
        totalPrice: Number(pr.totalPrice) || 0,
      })),
      installationPrice: Number(p.installationPrice) || 0,
    }))

    // Update service and create new packages
    const service = await prisma.service.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        icon,
        image,
        packages: {
          create: cleanPackages
        }
      },
      include: {
        packages: true
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.service.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}