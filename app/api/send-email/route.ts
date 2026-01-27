import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const sheets = google.sheets('v4');

async function appendToGoogleSheets(data: { name: string; phone: string; email: string; budgetRange: string; projectType: string }) {
  try {
    if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets not configured, skipping sheet update');
      return;
    }

    // Create JWT auth with correct parameters
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // Append data to sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            data.name,
            data.phone,
            data.email,
            data.budgetRange,
            data.projectType,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    console.log('Data added to Google Sheets successfully');
  } catch (error) {
    console.error('Error adding to Google Sheets:', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw - we still want the email to be sent even if sheets fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, budgetRange, projectType } = await request.json();

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
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
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget Range:</strong> ${budgetRange || 'Not specified'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    const formDataForSheet = { name, phone, email, budgetRange, projectType };

    await transporter.sendMail(mailOptions);

    appendToGoogleSheets(formDataForSheet).catch(err => 
      console.error('Google Sheets error:', err)
    );

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
