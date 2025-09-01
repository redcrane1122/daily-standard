import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/standups - Get all standup entries
export async function GET() {
  try {
    const standups = await prisma.standupEntry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(standups)
  } catch (error) {
    console.error('Error fetching standups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch standups' },
      { status: 500 }
    )
  }
}

// POST /api/standups - Create a new standup entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, date, yesterday, today, blockers } = body

    // Validate required fields
    if (!name || !date || !yesterday || !today) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const standup = await prisma.standupEntry.create({
      data: {
        name,
        date,
        yesterday,
        today,
        blockers: blockers || null
      }
    })

    return NextResponse.json(standup, { status: 201 })
  } catch (error) {
    console.error('Error creating standup:', error)
    return NextResponse.json(
      { error: 'Failed to create standup' },
      { status: 500 }
    )
  }
}
