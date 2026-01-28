// app/robots.ts
import { NextResponse } from 'next/server';

export function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://texoprefabworld.in/sitemap.xml
Host: https://texoprefabworld.in
  `;

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
