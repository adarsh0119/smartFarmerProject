import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import jwt from 'jsonwebtoken';
import { validateEmail } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { name, email, password, otp } = body;

    // Validate inputs
    if (!name || !email || !password || !otp) {
      return NextResponse.json(
        createErrorResponse('All fields are required'),
        { status: 400 }
      );
    }

    if (name.trim().length === 0) {
      return NextResponse.json(
        createErrorResponse('Please enter your name'),
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        createErrorResponse('Please enter a valid email address'),
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        createErrorResponse('Password must be at least 6 characters'),
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return NextResponse.json(
        createErrorResponse('Please request OTP first'),
        { status: 400 }
      );
    }

    console.log('User has password:', user.password ? 'Yes' : 'No');
    console.log('User OTP:', user.otp);

    // Check if user already has a password (already registered)
    if (user.password) {
      return NextResponse.json(
        createErrorResponse('Email already registered. Please login instead.'),
        { status: 400 }
      );
    }

    // Verify OTP
    console.log('Verifying OTP:', otp);
    const isOTPValid = user.verifyOTP(otp);
    console.log('OTP valid:', isOTPValid);
    
    if (!isOTPValid) {
      return NextResponse.json(
        createErrorResponse('Invalid or expired OTP'),
        { status: 400 }
      );
    }

    // Update user with name, password and mark as verified
    user.name = name;
    user.password = password;
    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      createSuccessResponse('Account created successfully', {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified
        }
      })
    );
  } catch (error) {
    console.error('Signup error:', error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      createErrorResponse('Failed to create account'),
      { status: 500 }
    );
  }
}
