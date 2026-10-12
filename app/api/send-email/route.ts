// import nodemailer from 'nodemailer';
// import { google } from 'googleapis';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const { name, phone, email, budgetRange, projectType, source } = await request.json();

//     if (!name || !phone || !email) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || !process.env.RECIPIENT_EMAIL) {
//       console.error('Missing email configuration:', {
//         hasEmail: !!process.env.SMTP_EMAIL,
//         hasPassword: !!process.env.SMTP_PASSWORD,
//         hasRecipient: !!process.env.RECIPIENT_EMAIL,
//       });
//       return NextResponse.json(
//         { error: 'Email service not configured. Please check environment variables.' },
//         { status: 500 }
//       );
//     }

//     const appPassword = process.env.SMTP_PASSWORD.replace(/\s/g, '');

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: appPassword,
//       },
//     });

//     const mailOptions = {
//       from: process.env.SMTP_EMAIL,
//       to: process.env.RECIPIENT_EMAIL,
//       subject: `New Incoming Lead [${source}]`,
//       html: `
//         <h2>New Incoming Lead</h2>
//         <p><strong>Lead From:</strong> ${source}</p>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Budget Range:</strong> ${budgetRange || 'Not specified'}</p>
//         <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
//         <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
// console.log('Sheets env check:', {
//   email: process.env.GOOGLE_CLIENT_EMAIL,
//   key: !!process.env.GOOGLE_PRIVATE_KEY,
//   sheet: process.env.GOOGLE_SHEET_ID,
// });
//     // Append to Google Sheets if credentials are present. Failures here do not block email sending.
//     if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
//       const auth = new google.auth.JWT({
//         email: process.env.GOOGLE_CLIENT_EMAIL,
//         key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
//         scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//       });

//       const sheets = google.sheets({ version: 'v4', auth });

//       try {
//         // await sheets.spreadsheets.values.append({
//         //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
//         //   range: 'Leads!A:G',
//         //   valueInputOption: 'USER_ENTERED',
//         //   requestBody: {
//         //     values: [
//         //       [
//         //         source,
//         //         new Date().toLocaleString(),
//         //         name,
//         //         email,
//         //         phone,
//         //         projectType || 'Not specified',
//         //         budgetRange || 'Not specified',
//         //       ],
//         //     ],
//         //   },
//         // });
//         const sheetName =
//             source === 'Farmhouses'
//               ? 'Farmhouses'
//               : source === 'Offices'
//               ? 'Offices'
//               : 'Leads';

//           await sheets.spreadsheets.values.append({
//             spreadsheetId: process.env.GOOGLE_SHEET_ID,
//             range: `${sheetName}!A:G`,
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//               values: [
//                 [
//                   source,
//                   new Date().toLocaleString(),
//                   name,
//                   email,
//                   phone,
//                   projectType || 'Not specified',
//                   budgetRange || 'Not specified',
//                 ],
//               ],
//             },
//           });
//       } catch (sheetErr) {
//         console.error('Failed to append to Google Sheets:', sheetErr);
//       }
//     } else {
//       console.warn('Skipping Google Sheets append; GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY/GOOGLE_SHEET_ID missing');
//     }

//     return NextResponse.json(
//       { success: true, message: 'Email sent successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Email sending error:', error);
//     return NextResponse.json(
//       { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }


import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type LeadInput = {
  name: string;
  phone: string;
  email: string;
  budgetRange?: string;
  projectType?: string;
  source?: string;
};

async function createZohoLead({
  name,
  phone,
  email,
  budgetRange,
  projectType,
  source,
}: LeadInput): Promise<string> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  const accountsUrl =
    process.env.ZOHO_ACCOUNTS_URL ||
    'https://accounts.zoho.in';

  const apiUrl =
    process.env.ZOHO_API_URL ||
    'https://www.zohoapis.in';

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Zoho CRM environment variables are missing');
  }

  // Obtain an access token using the refresh token.
  const tokenResponse = await fetch(
    `${accountsUrl}/oauth/v2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
      cache: 'no-store',
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    console.error('Zoho token request failed:', tokenData);
    throw new Error('Failed to authenticate with Zoho CRM');
  }

  // Prepare the CRM Lead record.
  const lead = {
    Last_Name: name.trim(),
    Phone: phone.trim(),
    Email: email.trim(),
    Lead_Source: source || 'Website',
    Description: [
      `Form source: ${source || 'Website'}`,
      `Project type: ${projectType || 'Not specified'}`,
      `Budget range: ${budgetRange || 'Not specified'}`,
    ].join('\n'),
  };

  const crmResponse = await fetch(`${apiUrl}/crm/v8/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [lead] }),
    cache: 'no-store',
  });

  const crmData = await crmResponse.json();
  const record = crmData.data?.[0];

  if (!crmResponse.ok || record?.status !== 'success') {
    console.error('Zoho CRM record creation failed:', crmData);
    throw new Error('Failed to create Lead in Zoho CRM');
  }

  return record.details.id as string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadInput>;
    const { name, phone, email, budgetRange, projectType, source } = body;

    // Validate required fields.
    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof phone !== 'string' ||
      !phone.trim() ||
      typeof email !== 'string' ||
      !email.trim()
    ) {
      return NextResponse.json(
        { error: 'Name, phone and email are required' },
        { status: 400 }
      );
    }

    // Validate email configuration.
    if (
      !process.env.SMTP_EMAIL ||
      !process.env.SMTP_PASSWORD ||
      !process.env.RECIPIENT_EMAIL
    ) {
      console.error('Email environment variables are missing');

      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send the email notification.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD.replace(/\s/g, ''),
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Incoming Lead [${source || 'Website'}]`,
      text: [
        'New Incoming Lead',
        `Lead From: ${source || 'Website'}`,
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim()}`,
        `Email: ${email.trim()}`,
        `Budget Range: ${budgetRange || 'Not specified'}`,
        `Project Type: ${projectType || 'Not specified'}`,
        `Submitted at: ${new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
        })}`,
      ].join('\n'),
    });

    // Create the Lead in Zoho CRM.
    const leadId = await createZohoLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      budgetRange,
      projectType,
      source,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent and lead saved to Zoho CRM',
        leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);

    return NextResponse.json(
      { error: 'Lead submission could not be completed' },
      { status: 500 }
    );
  }
}