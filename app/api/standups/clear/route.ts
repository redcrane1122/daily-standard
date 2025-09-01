import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// DELETE /api/standups/clear - Clear all standup entries
export async function DELETE() {
  try {
    await prisma.standupEntry.deleteMany()
    
    return NextResponse.json({ message: 'All standups cleared successfully' })
  } catch (error) {
    console.error('Error clearing standups:', error)
    return NextResponse.json(
      { error: 'Failed to clear standups' },
      { status: 500 }
    )
  }
}
