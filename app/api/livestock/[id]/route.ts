import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import Livestock from '@/lib/db/models/Livestock';
import { verifyAuth } from '@/lib/middleware/auth';
import { successResponse, errorResponse } from '@/lib/utils/response';

export async function GET(
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

    const livestock = await Livestock.findOne({
      _id: params.id,
      userId: authResult.userId
    });

    if (!livestock) {
      return NextResponse.json(
        errorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse('Livestock fetched successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error fetching livestock:', error);
    return NextResponse.json(
      errorResponse(error.message || 'Failed to fetch livestock'),
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const livestock = await Livestock.findOneAndUpdate(
      { _id: params.id, userId: authResult.userId },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!livestock) {
      return NextResponse.json(
        errorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse('Livestock updated successfully', livestock)
    );
  } catch (error: any) {
    console.error('Error updating livestock:', error);
    return NextResponse.json(
      errorResponse(error.message || 'Failed to update livestock'),
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const livestock = await Livestock.findOneAndDelete({
      _id: params.id,
      userId: authResult.userId
    });

    if (!livestock) {
      return NextResponse.json(
        errorResponse('Livestock not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse('Livestock deleted successfully')
    );
  } catch (error: any) {
    console.error('Error deleting livestock:', error);
    return NextResponse.json(
      errorResponse(error.message || 'Failed to delete livestock'),
      { status: 500 }
    );
  }
}
