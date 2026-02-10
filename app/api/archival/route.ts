import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
      { userName: { contains: search, mode: 'insensitive' } },
    ];
  }

  const records = await prisma.archivalRecord.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const record = await prisma.archivalRecord.create({ data });

  return NextResponse.json(record, { status: 201 });
}
