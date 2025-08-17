export default async function handler(req, res) {
  const base = process.env.SUPABASE_FUNCTIONS_BASE_URL;
  const anon = process.env.SUPABASE_FUNCTIONS_ANON_KEY;

  if (!base || !anon) {
    return res
      .status(500)
      .json({ error: "Missing env: SUPABASE_FUNCTIONS_BASE_URL or SUPABASE_FUNCTIONS_ANON_KEY" });
  }

  const character = req.query.character ? String(req.query.character) : null;
  const qs = character ? `?character=${encodeURIComponent(character)}` : "";

  try {
    console.info("Request URL:", `${base}/v1/random-quote${qs}`);
    const r = await fetch(`${base}/v1/random-quote${qs}`, {
      headers: {
        Authorization: `Bearer ${anon}`,
        apikey: anon,
      },
    });

    const body = await r.text(); // pass through whatever the function returns
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=600");
    return res.status(r.status).send(body);
  } catch (err) {
    return res.status(500).json({ error: String(err?.message || err) });
  }
}