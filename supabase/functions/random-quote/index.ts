import { createClient } from "@supabase/supabase-js";
import { corsHeaders, handleOptions } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  const url = new URL(req.url);
  const character = url.searchParams.get("character");

  const rpc = character
    ? supabase.rpc("random_quote_by_character", { p_slug: character })
    : supabase.rpc("random_quote");

  const { data, error } = await rpc;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  const row = data?.[0];
  const payload = row
    ? {
        data: {
          id: row.id,
          content: row.content,
          character: {
            id: row.character_obj.id,
            name: row.character_obj.name,
            slug: row.character_obj.slug,
            image_url: row.character_obj.image_url,
          },
        },
      }
    : { data: null };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      ...corsHeaders,
      "content-type": "application/json",
      "cache-control": "public, max-age=60",
    },
  });
});