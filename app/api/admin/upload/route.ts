import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function POST(request: NextRequest) {
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true })

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const ext = path.extname(file.name)
    const name = `${crypto.randomBytes(8).toString('hex')}${ext}`
    const filepath = path.join(UPLOADS_DIR, name)

    const buffer = await file.arrayBuffer()
    await fs.writeFile(filepath, Buffer.from(buffer))

    const url = `/uploads/${name}`

    return NextResponse.json({
      name,
      url,
      date: new Date().toISOString()
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
