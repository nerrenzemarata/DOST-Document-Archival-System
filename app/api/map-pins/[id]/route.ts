import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();

  const pin = await prisma.mapPin.update({
    where: { id },
    data,
  });

  return NextResponse.json(pin);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.mapPin.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
