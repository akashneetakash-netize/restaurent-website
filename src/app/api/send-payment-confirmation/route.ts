import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { guestName, guestEmail, amount, transactionId, items = [] } = body;

    if (!guestEmail) {
      return NextResponse.json({ error: 'Guest email is required' }, { status: 400 });
    }

    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send({
        to: guestEmail,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@havensanctuary.com',
        subject: `Payment Successful – Haven Sanctuary | ₹${amount}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 40px; border-radius: 16px;">
            <h2 style="color: #c9a227; letter-spacing: 2px;">HAVEN SANCTUARY</h2>
            <p style="color: #aaa;">Payment Confirmation</p>
            <hr style="border-color: #333; margin: 24px 0;" />
            <p>Dear <strong>${guestName || 'Guest'}</strong>,</p>
            <p>Your payment of <strong style="color: #c9a227;">₹${amount}</strong> was successful.</p>
            <p>Transaction ID: <code style="background: #222; padding: 4px 8px; border-radius: 4px;">${transactionId}</code></p>
            <p style="color: #666; font-size: 12px; margin-top: 32px;">Thank you for dining with us.</p>
          </div>
        `,
      });
    } else {
      console.log('SENDGRID_API_KEY missing, payment confirmation details:', body);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Payment Confirmation Error:', error);
    return NextResponse.json({ error: 'Failed to send payment confirmation' }, { status: 500 });
  }
}
