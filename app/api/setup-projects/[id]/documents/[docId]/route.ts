import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string; docId: string }> }) {
  const { docId } = await params;
  const data = await req.json();

  const document = await prisma.projectDocument.update({
    where: { id: docId },
    data,
  });

  return NextResponse.json(document);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string; docId: string }> }) {
  const { docId } = await params;

  await prisma.projectDocument.delete({ where: { id: docId } });

  return NextResponse.json({ success: true });
}
