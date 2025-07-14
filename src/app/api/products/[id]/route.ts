export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params  // ต้อง await ก่อนใช้งาน
    const numericId = Number(id)

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id: numericId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        stock: true,
        createdAt: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error in GET /api/products/[id]:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
