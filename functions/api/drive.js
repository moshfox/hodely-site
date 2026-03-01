export async function onRequestPost(context) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbws_NdbB68vUI42rt_GPLeSGZLSl7Dg25KTntZbHh-YBJdFfSZO3DnOsykmbZ9ObQWK/exec";

  const bodyText = await context.request.text();

  const resp = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyText,
  });

  const text = await resp.text();

  return new Response(text, {
    status: resp.status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // CORS (por si lo llamas desde otros subdominios)
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      // cache off
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequestOptions() {
  return new Response("", {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
