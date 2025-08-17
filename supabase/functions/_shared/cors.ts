export const corsHeaders = {
  "access-control-allow-origin": "*", // or your domain
  "access-control-allow-methods": "GET,OPTIONS",
  "access-control-allow-headers":
    "authorization, x-client-info, apikey, content-type",
};

export function handleOptions(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return null;
}