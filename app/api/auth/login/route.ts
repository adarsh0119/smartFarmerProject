import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import jwt from 'jsonwebtoken';
import { validateEmail } from '@/lib/utils/validators';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/helpers';
import { sendOTP } from '@/lib/utils/sms';

const JWT_SECRET = process.env.JWT_SECRET || 'smartfarmer_super_secret_key_2024';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, otp, action } = body;

    // ── STEP 1: Send OTP to registered email ──────────────
    if (action === 'send-otp') {
      if (!email || !validateEmail(email)) {
        return NextResponse.json(
          createErrorResponse('कृपया एक वैध ईमेल पता दर्ज करें'),
          { status: 400 }
        );
      }

      // Check if user is registered
      const user = await User.findOne({ email });
      if (!user || !user.isVerified) {
        return NextResponse.json(
          createErrorResponse('यह ईमेल रजिस्टर नहीं है। पहले साइन अप करें।'),
          { status: 404 }
        );
      }

      // Generate & send OTP
      const generatedOtp = user.generateOTP();
      await user.save({ validateBeforeSave: false });
      await sendOTP(email, generatedOtp);

      // Never expose OTP in response
      return NextResponse.json(
        createSuccessResponse('OTP आपके ईमेल पर भेज दिया गया है', { expiresIn: '10 minutes' })
      );
    }

    // ── STEP 2: Verify OTP and return JWT token ───────────
    if (action === 'verify-otp') {
      if (!email || !validateEmail(email)) {
        return NextResponse.json(
          createErrorResponse('कृपया एक वैध ईमेल पता दर्ज करें'),
          { status: 400 }
        );
      }

      if (!otp || otp.length !== 6) {
        return NextResponse.json(
          createErrorResponse('कृपया 6 अंकों का OTP दर्ज करें'),
          { status: 400 }
        );
      }

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          createErrorResponse('उपयोगकर्ता नहीं मिला'),
          { status: 404 }
        );
      }

      const isValid = user.verifyOTP(otp);
      if (!isValid) {
        return NextResponse.json(
          createErrorResponse('OTP गलत है या समाप्त हो गया है'),
          { status: 400 }
        );
      }

      // Clear OTP and mark verified
      user.otp = undefined;
      user.isVerified = true;
      await user.save({ validateBeforeSave: false });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json(
        createSuccessResponse('लॉगिन सफल', {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            state: user.state,
          },
        })
      );
    }

    return NextResponse.json(
      createErrorResponse('अमान्य अनुरोध'),
      { status: 400 }
    );
  } catch (error) {
    console.error('Login OTP error:', error);
    return NextResponse.json(
      createErrorResponse('सर्वर त्रुटि। कृपया पुनः प्रयास करें।'),
      { status: 500 }
    );
  }
}
