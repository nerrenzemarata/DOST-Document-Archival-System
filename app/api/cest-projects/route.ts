import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const funding = searchParams.get('funding');

  const where: Record<string, unknown> = {};
  if (funding) where.programFunding = funding;
  if (search) {
    where.OR = [
      { projectTitle: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
      { beneficiaries: { contains: search, mode: 'insensitive' } },
    ];
  }

  const projects = await prisma.cestProject.findMany({
    where,
    orderBy: { code: 'asc' },
  });

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const project = await prisma.cestProject.create({ data });

  return NextResponse.json(project, { status: 201 });
}
