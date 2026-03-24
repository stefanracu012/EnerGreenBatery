import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function GET() {
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true })

    const files = await fs.readdir(UPLOADS_DIR)
    const uploadedFiles = []

    for (const file of files) {
      if (file === '.gitkeep') continue
      const filepath = path.join(UPLOADS_DIR, file)
      const stat = await fs.stat(filepath)
      uploadedFiles.push({
        name: file,
        url: `/uploads/${file}`,
        date: stat.mtime.toISOString()
      })
    }

    return NextResponse.json(uploadedFiles.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
