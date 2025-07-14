// "server actions" route file – อ่าน/เขียน DB ผ่าน Prisma
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// ────────────────────────────────
// 1) GET /api/products?page=&limit=&search=&sortBy=&sortOrder=
// ────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    // ── 1.1 รับ query string ────────────────
    const { searchParams } = new URL(request.url)
    const page        = Number(searchParams.get('page')  ?? '1')
    const limit       = Number(searchParams.get('limit') ?? '10')
    const search      = searchParams.get('search')       ?? ''
    const sortBy      = searchParams.get('sortBy')       ?? 'createdAt'
    const sortOrder   = (searchParams.get('sortOrder')   ?? 'desc') as
                        'asc' | 'desc'

    // ── 1.2 สร้างเงื่อนไขค้นหา & เรียง ─────
    const where: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name:        { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}

    const orderBy: Prisma.ProductOrderByWithRelationInput = { [sortBy]: sortOrder }

    // ── 1.3 ดึงข้อมูลพร้อมนับ ────────────────
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, name: true, description: true,
          price: true, imageUrl: true, stock: true, createdAt: true,
        },
      }),
      prisma.product.count({ where }),
    ])

    // ── 1.4 ตอบกลับ ────────────────
    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        hasNextPage: page * limit < totalCount,
        hasPreviousPage: page > 1,
      },
    })
  } catch (err) {
    console.error('GET /api/products error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// ────────────────────────────────
// 2) POST /api/products
//    body: { name, description, price, imageUrl, stock }
// ────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // ── 2.1 Validation อย่างง่าย ─────────────
    const { name, description, price, imageUrl, stock } = body
    if (!name || typeof price !== 'number')
      return NextResponse.json(
        { error: 'name & price are required' },
        { status: 400 },
      )

    // ── 2.2 บันทึก DB ───────────────────────
    const product = await prisma.product.create({
      data: { name, description, price, imageUrl, stock },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    console.error('POST /api/products error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
