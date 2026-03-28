import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sanitizeSlug } from '@/lib/slug'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { year: 'desc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, capacity, description, location, year, images, details, specs, gridSize, featured } = body
    const slug = sanitizeSlug(body.slug || '')
    if (!slug) return NextResponse.json({ error: 'Slug invalid' }, { status: 400 })

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        category: category || 'Rezidențial',
        capacity: capacity || '',
        description,
        location,
        year,
        images,
        details: details || [],
        specs: specs || [],
        gridSize,
        featured
      }
    })

    revalidatePath('/')
    revalidatePath(`/proiecte/${slug}`)

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}