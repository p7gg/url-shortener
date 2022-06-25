import type { NextApiHandler } from 'next';

import { supabase } from '@/lib';
import type { ShortUrl } from '@/types';

const getUrl: NextApiHandler = async (req, res) => {
  const slug = req.query['slug'];

  if (!slug || typeof slug !== 'string') {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: 'missing slug' }));

    return;
  }

  const { data } = await supabase
    .from<ShortUrl>('shortUrl')
    .select('*')
    .match({ slug })
    .single();

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: 'slug not found' }));

    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate');

  return res.json(data);
};

export default getUrl;
