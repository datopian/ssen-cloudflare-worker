// src/worker.ts
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    const headers = {
      "content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    };
    if (request.method === "GET" || request.method === "HEAD") {
      if (request.method == "HEAD") {
        return new Response(void 0, { status: 400, headers });
      }
      const listing = await env.SSEN_BUCKET.list({ prefix: key });
      listing.objects = listing.objects.map((e) => ({
        ...e,
        "Content-Type": "text/csv",
        downloadLink: env.PUBLIC_BUCKET_URI + e.key
      }));
      return new Response(JSON.stringify(listing), { headers });
    }
    return new Response(`Unsupported method`, {
      status: 400
    });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
