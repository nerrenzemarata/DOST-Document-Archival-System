import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const logs = await prisma.userLog.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: { timestamp: 'desc' },
  });

  return NextResponse.json(logs);
}
