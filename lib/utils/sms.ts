import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  // For development, use ethereal.email (free test emails)
  if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_HOST) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER || 'test@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'test123'
      }
    });
  }

  // For production, use configured email service
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export async function sendOTP(email: string, otp: string): Promise<boolean> {
  try {
    // In development mode, just log to console (no email sending)
    if (process.env.NODE_ENV === 'development') {
      console.log('\n========================================');
      console.log('🔐 OTP VERIFICATION CODE');
      console.log('========================================');
      console.log(`Email: ${email}`);
      console.log(`OTP: ${otp}`);
      console.log(`Valid for: 10 minutes`);
      console.log('========================================\n');
      return true;
    }

    // For production, send actual email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Smart Farmer" <noreply@smartfarmer.com>',
      to: email,
      subject: 'Your Smart Farmer OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Smart Farmer Assistant</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px;">
            <h2 style="color: #374151; margin-top: 0;">Your OTP Code</h2>
            <p style="color: #6b7280; font-size: 16px;">Use the following OTP to complete your signup:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #10b981;">${otp}</div>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              This OTP is valid for <strong>10 minutes</strong>. 
              If you didn't request this OTP, please ignore this email.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px;">
                Smart Farmer Assistant - Helping farmers grow smarter<br>
                This is an automated message, please do not reply.
              </p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[PROD] OTP sent to ${email}`);
    
    return true;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    
    // Fallback to console log in case of email failure
    console.log(`[FALLBACK] OTP for ${email}: ${otp}`);
    return true;
  }
}

export async function sendAlert(email: string, message: string): Promise<boolean> {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Smart Farmer" <noreply@smartfarmer.com>',
      to: email,
      subject: 'Smart Farmer Alert',
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Smart Farmer Alert</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send alert email:', error);
    return false;
  }
}

// For backward compatibility with mobile OTP (now uses email)
export async function sendMobileOTP(mobile: string, otp: string): Promise<boolean> {
  // In free tier, we'll log to console and suggest using email
  console.log(`[FREE TIER] OTP for mobile ${mobile}: ${otp}`);
  console.log(`[NOTE] For production, consider using email OTP or integrate free SMS services like TextLocal/Fast2SMS`);
  return true;
}