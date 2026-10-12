import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const clickSheetName = 'Clicks';
const pageSources = new Set(['Farmhouses', 'Prefab Offices']);

function getIndianTimestamp(): string {
  return `${new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  })} IST`;
}

export async function POST(request: Request) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const body = (await request.json().catch(() => ({}))) as {
    source?: unknown;
  };

  const pageSource = body.source;

  if (
    !clientEmail ||
    !privateKey ||
    !spreadsheetId ||
    typeof pageSource !== 'string' ||
    !pageSources.has(pageSource)
  ) {
    console.error(
      'Phone click tracking request is invalid or not configured'
    );

    return NextResponse.json(
      { error: 'Phone click tracking request is invalid or not configured' },
      { status: 400 }
    );
  }

  try {
    const normalizedPrivateKey = privateKey
      .trim()
      .replace(/^["']|["']$/g, '')
      .replace(/\\n/g, '\n');

    if (
      !normalizedPrivateKey.startsWith(
        '-----BEGIN PRIVATE KEY-----'
      ) ||
      !normalizedPrivateKey.includes(
        '-----END PRIVATE KEY-----'
      )
    ) {
      console.error(
        'GOOGLE_PRIVATE_KEY is not in the expected PEM format'
      );

      return NextResponse.json(
        { error: 'Google credentials are incorrectly configured' },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: normalizedPrivateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      version: 'v4',
      auth,
    });

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title',
    });

    const clickSheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === clickSheetName
    );

    if (!clickSheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: clickSheetName,
                },
              },
            },
          ],
        },
      });
    }

    const existingClicks = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${clickSheetName}!C:C`,
    });
    const sourceClickCount =
      existingClicks.data.values?.filter(
        ([existingSource]) => existingSource === pageSource
      ).length ?? 0;
    const clickNumber = sourceClickCount + 1;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${clickSheetName}!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            'Phone clicked',
            getIndianTimestamp(),
            pageSource,
            `${pageSource}-${clickNumber}`,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
  console.error('Google Sheets tracking error:', error);

  return NextResponse.json(
    {
      error: 'Phone click could not be tracked',
      details:
        error instanceof Error
          ? error.message
          : String(error),
    },
    { status: 500 }
  );
}
}