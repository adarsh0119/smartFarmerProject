import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { sendOTP } from '@/lib/utils/sms';
import { validateEmail } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        createErrorResponse('Please enter a valid email address'),
        { status: 400 }
      );
    }

    // Find or create user by email
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
    }

    // Generate OTP
    const otp = user.generateOTP();
    await user.save({ validateBeforeSave: false }); // Skip validation for OTP generation

    // Send OTP via Email (console in dev mode)
    await sendOTP(email, otp);

    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        createSuccessResponse('OTP sent successfully to your email', {
          otp, // Only for development
          expiresIn: '10 minutes'
        })
      );
    }

    return NextResponse.json(
      createSuccessResponse('OTP sent successfully to your email', {
        expiresIn: '10 minutes'
      })
    );
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      createErrorResponse('Failed to send OTP'),
      { status: 500 }
    );
  }
}