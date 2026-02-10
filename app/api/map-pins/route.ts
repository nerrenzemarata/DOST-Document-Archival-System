import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const program = searchParams.get('program');
  const district = searchParams.get('district');

  const where: Record<string, unknown> = {};
  if (program) where.program = program.toUpperCase();
  if (district) where.district = parseInt(district, 10);

  const pins = await prisma.mapPin.findMany({ where });

  return NextResponse.json(pins);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const pin = await prisma.mapPin.create({ data });

  return NextResponse.json(pin, { status: 201 });
}
