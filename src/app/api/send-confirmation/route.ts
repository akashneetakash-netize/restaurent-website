import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      reservationDate,
      reservationTime,
      partySize,
      section,
      tableNumber,
      specialRequests,
    } = body;

    if (!guestEmail) {
      return NextResponse.json({ error: 'Guest email is required' }, { status: 400 });
    }

    const hasSendGrid =
      process.env.SENDGRID_API_KEY &&
      !process.env.SENDGRID_API_KEY.includes('your_sendgrid');

    if (hasSendGrid) {
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        // Email to guest
        await sgMail.send({
          to: guestEmail,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@havensanctuary.com',
          subject: `Reservation Confirmed – Haven Sanctuary | Table #${tableNumber}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 40px; border-radius: 16px;">
              <h2 style="color: #c9a227; letter-spacing: 2px;">HAVEN SANCTUARY</h2>
              <p style="color: #aaa;">Bandra West, Mumbai</p>
              <hr style="border-color: #333; margin: 24px 0;" />
              <p>Dear <strong>${guestName}</strong>,</p>
              <p>Your table has been successfully reserved.</p>
              <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
                <tr><td style="padding: 10px 0; color: #aaa;">Date</td><td style="padding: 10px 0;">${reservationDate}</td></tr>
                <tr><td style="padding: 10px 0; color: #aaa;">Time</td><td style="padding: 10px 0;">${reservationTime}</td></tr>
                <tr><td style="padding: 10px 0; color: #aaa;">Party Size</td><td style="padding: 10px 0;">${partySize}</td></tr>
                <tr><td style="padding: 10px 0; color: #aaa;">Section</td><td style="padding: 10px 0;">${section}</td></tr>
                <tr><td style="padding: 10px 0; color: #aaa;">Table</td><td style="padding: 10px 0; color: #c9a227; font-weight: bold;">#${tableNumber}</td></tr>
                <tr><td style="padding: 10px 0; color: #aaa;">Special Requests</td><td style="padding: 10px 0;">${specialRequests || 'None'}</td></tr>
              </table>
              <p>We look forward to welcoming you.</p>
              <p style="color: #666; font-size: 12px; margin-top: 32px;">Haven Sanctuary • Bandra West, Mumbai</p>
            </div>
          `,
        });

        // Copy to restaurant
        if (process.env.RESTAURANT_EMAIL && !process.env.RESTAURANT_EMAIL.includes('your-restaurant')) {
          await sgMail.send({
            to: process.env.RESTAURANT_EMAIL,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@havensanctuary.com',
            subject: `New Reservation – ${guestName} | Table #${tableNumber}`,
            html: `<pre style="font-family: monospace; background: #111; color: #eee; padding: 20px;">${JSON.stringify(body, null, 2)}</pre>`,
          });
        }
      } catch (sgError) {
        console.warn('SendGrid booking email warning:', sgError);
      }
    } else {
      console.log('[DEMO MODE] Booking confirmed for:', guestName);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Send Confirmation Error:', error);
    return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 });
  }
}
