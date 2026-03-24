import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const filepath = path.join(UPLOADS_DIR, params.name)

    // Security check: ensure path is within UPLOADS_DIR
    if (!filepath.startsWith(UPLOADS_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    await fs.unlink(filepath)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}