import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { verifyAuth } from '@/lib/middleware/auth';
import { successResponse, errorResponse } from '@/lib/utils/response';

// Add vaccination
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
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        errorResponse('Missing required fields'),
        { status: 400 }
      );
    }

    let updateQuery: any = {};

    if (type === 'vaccination') {
      updateQuery = {
        $push: { 'health.vaccinations': data }
      };
    } else if (type === 'treatment') {
      updateQuery = {
        $push: { 'health.treatments': data },
        $set: { 'health.status': 'under_treatment' }
      };
    } else if (type === 'checkup') {
      updateQuery = {
        $push: { 'health.checkups': data }
      };
    } else if (type === 'status') {
      updateQuery = {
        $set: { 'health.status': data.status }
      };
    } else {
      return NextResponse.json(
        errorResponse('Invalid health record type'),
        { status: 400 }
      );
    }

    const livestock = await Livestock.findOneAndUpdate(
      { _id: params.id, userId: authResult.userId },
      updateQuery,
      { new: true }
    );

    if (!livestock) {
      return NextResponse.json(
        errorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse('Health record added successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error adding health record:', error);
    return NextResponse.json(
      errorResponse(error.message || 'Failed to add health record'),
      { status: 500 }
    );
  }
}
