import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, budgetRange, projectType } = await request.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || !process.env.RECIPIENT_EMAIL) {
      console.error('Missing email configuration:', {
        hasEmail: !!process.env.SMTP_EMAIL,
        hasPassword: !!process.env.SMTP_PASSWORD,
        hasRecipient: !!process.env.RECIPIENT_EMAIL,
      });
      return NextResponse.json(
        { error: 'Email service not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    const appPassword = process.env.SMTP_PASSWORD.replace(/\s/g, '');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: appPassword,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Incoming Lead [Farmhouse Page]',
      html: `
        <h2>New Incoming Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget Range:</strong> ${budgetRange || 'Not specified'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
console.log('Sheets env check:', {
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: !!process.env.GOOGLE_PRIVATE_KEY,
  sheet: process.env.GOOGLE_SHEET_ID,
});
    // Append to Google Sheets if credentials are present. Failures here do not block email sending.
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Leads!A:G',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                'Website',
                new Date().toLocaleString(),
                name,
                email,
                phone,
                projectType || 'Not specified',
                budgetRange || 'Not specified',
              ],
            ],
          },
        });
      } catch (sheetErr) {
        console.error('Failed to append to Google Sheets:', sheetErr);
      }
    } else {
      console.warn('Skipping Google Sheets append; GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY/GOOGLE_SHEET_ID missing');
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}