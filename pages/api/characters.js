export default async function handler(_req, res) {
  const base = process.env.SUPABASE_FUNCTIONS_BASE_URL;
  const anon = process.env.SUPABASE_FUNCTIONS_ANON_KEY;

  if (!base || !anon) {
    return res
      .status(500)
      .json({ error: "Missing env: SUPABASE_FUNCTIONS_BASE_URL or SUPABASE_FUNCTIONS_ANON_KEY" });
  }

  try {
    const r = await fetch(`${base}/v1/get-characters`, {
      headers: {
        Authorization: `Bearer ${anon}`,
        apikey: anon,
      },
    });

    const body = await r.text(); // pass through
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=1800");
    return res.status(r.status).send(body);
  } catch (err) {
    return res.status(500).json({ error: String(err?.message || err) });
  }
}