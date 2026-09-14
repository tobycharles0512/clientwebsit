const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = 'current-client';

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const data = await redis.get(KEY);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(data || { client: null, sellerSignaturePng: null });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    const { password, client, sellerSignaturePng } = body || {};

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const existing = (await redis.get(KEY)) || {};
    const next = {
      client: client === undefined ? (existing.client ?? null) : client,
      sellerSignaturePng: sellerSignaturePng === undefined ? (existing.sellerSignaturePng ?? null) : sellerSignaturePng,
    };
    await redis.set(KEY, next);
    return res.status(200).json({ ok: true, data: next });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
};
