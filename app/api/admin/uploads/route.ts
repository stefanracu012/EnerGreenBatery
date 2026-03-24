import { NextResponse } from 'next/server'
import { list } from '@vercel/blob'

export async function GET() {
  try {
    const { blobs } = await list()

    const uploadedFiles = blobs.map((blob) => ({
      name: blob.pathname,
      url: blob.url,
      date: blob.uploadedAt.toISOString(),
    }))

    return NextResponse.json(
      uploadedFiles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    )
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
