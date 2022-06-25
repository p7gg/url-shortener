import { NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';

const middleware: NextMiddleware = async (req, res) => {
  if (
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname === '/favicon.ico'
  ) {
    return;
  }

  const slug = req.nextUrl.pathname.split('/').pop();

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  if (slugFetch.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await slugFetch.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
};

export default middleware;
