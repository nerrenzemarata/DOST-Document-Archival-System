import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const documents = await prisma.projectDocument.findMany({
    where: { projectId: id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(documents);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();

  const document = await prisma.projectDocument.create({
    data: { ...data, projectId: id },
  });

  return NextResponse.json(document, { status: 201 });
}
