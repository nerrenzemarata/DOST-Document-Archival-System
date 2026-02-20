import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
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
  } catch (error) {
    console.error('GET /api/cest-projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const project = await prisma.cestProject.create({ data });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/cest-projects error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
