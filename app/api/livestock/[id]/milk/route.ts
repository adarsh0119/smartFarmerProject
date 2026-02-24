import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { verifyAuth } from '@/lib/middleware/auth';
import { successResponse, errorResponse } from '@/lib/utils/response';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.success || !authResult.userId) {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { date, morning, evening, fat, notes } = body;

    if (!date || morning === undefined || evening === undefined) {
      return NextResponse.json(
        errorResponse('Missing required fields'),
        { status: 400 }
      );
    }

    const total = morning + evening;

    const livestock = await Livestock.findOneAndUpdate(
      { _id: params.id, userId: authResult.userId },
      {
        $push: {
          'milkProduction.records': {
            date: new Date(date),
            morning,
            evening,
            total,
            fat,
            notes
          }
        }
      },
      { new: true }
    );

    if (!livestock) {
      return NextResponse.json(
        errorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    // Calculate average
    const records = livestock.milkProduction?.records || [];
    const last7Days = records.slice(-7);
    const avgPerDay = last7Days.reduce((sum, r) => sum + r.total, 0) / last7Days.length;

    await Livestock.findByIdAndUpdate(params.id, {
      'milkProduction.averagePerDay': avgPerDay
    });

    return NextResponse.json(
      successResponse('Milk production recorded successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error recording milk production:', error);
    return NextResponse.json(
      errorResponse(error.message || 'Failed to record milk production'),
      { status: 500 }
    );
  }
}
