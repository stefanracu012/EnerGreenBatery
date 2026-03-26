import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const { slug, title, category, capacity, description, location, year, images, details, specs, gridSize, featured } = await request.json()

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

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}