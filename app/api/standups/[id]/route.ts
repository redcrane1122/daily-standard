import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/standups/[id] - Get a specific standup entry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const standup = await prisma.standupEntry.findUnique({
      where: {
        id
      }
    })

    if (!standup) {
      return NextResponse.json(
        { error: 'Standup not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(standup)
  } catch (error) {
    console.error('Error fetching standup:', error)
    return NextResponse.json(
      { error: 'Failed to fetch standup' },
      { status: 500 }
    )
  }
}

// PUT /api/standups/[id] - Update a specific standup entry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, date, yesterday, today, blockers } = body

    // Validate required fields
    if (!name || !date || !yesterday || !today) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const standup = await prisma.standupEntry.update({
      where: {
        id
      },
      data: {
        name,
        date,
        yesterday,
        today,
        blockers: blockers || null
      }
    })

    return NextResponse.json(standup)
  } catch (error) {
    console.error('Error updating standup:', error)
    return NextResponse.json(
      { error: 'Failed to update standup' },
      { status: 500 }
    )
  }
}

// DELETE /api/standups/[id] - Delete a specific standup entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.standupEntry.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ message: 'Standup deleted successfully' })
  } catch (error) {
    console.error('Error deleting standup:', error)
    return NextResponse.json(
      { error: 'Failed to delete standup' },
      { status: 500 }
    )
  }
}
