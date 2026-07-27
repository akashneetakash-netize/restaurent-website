import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { redis } from '@/lib/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Rate limiting: max 5 OTP requests per email per hour
    const rateKey = `otp_rate:${email}`;
    const attempts = await redis.incr(rateKey);
    if (attempts === 1) {
      await redis.expire(rateKey, 3600);
    }
    if (attempts > 5) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please try again after 1 hour.' },
        { status: 429 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP for 10 minutes
    await redis.set(`otp:${email}`, otp, { ex: 600 });

    if (process.env.SENDGRID_API_KEY) {
      // Always initialize inside handler — never at module level
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@havensanctuary.com',
        subject: 'Your Haven Sanctuary OTP',
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 40px; border-radius: 16px;">
            <h2 style="color: #c9a227; letter-spacing: 2px; margin-bottom: 8px;">HAVEN SANCTUARY</h2>
            <p style="color: #aaa; font-size: 14px;">Bandra West, Mumbai</p>
            <hr style="border-color: #333; margin: 24px 0;" />
            <p>Your One-Time Password is:</p>
            <h1 style="letter-spacing: 12px; font-size: 36px; color: #c9a227; margin: 16px 0;">${otp}</h1>
            <p style="color: #aaa; font-size: 13px;">Valid for <strong>10 minutes</strong>. Do not share this code.</p>
            <p style="color: #666; font-size: 12px; margin-top: 32px;">If you did not request this, please ignore this email.</p>
          </div>
        `,
      });
    } else {
      console.log('[DEV] SENDGRID_API_KEY missing, OTP is:', otp);
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
  }
}
