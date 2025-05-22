# API Reference

This document describes the HTTP API for **OnFly Image Optimization**. All endpoints are under the `/img` route at your deployment domain.

---

## GET `/img/{id}`

Dynamically fetches the original image by its **ID** from your Supabase bucket, applies on-the-fly transformations, and returns the optimized image with caching headers.

### Path Parameters

| Parameter | Type   | Required | Description                                                                                       |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------- |
| `id`      | string | Yes      | Unique image identifier generated on upload. Matches the `id` column in the `image_assets` table. |

### Query Parameters

| Parameter | Alias   | Type    | Required | Default  | Description                                                                                             |
| --------- | ------- | ------- | -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `w`       | width   | integer | No       | original | Desired width in pixels. If only one dimension is provided, the image is resized proportionally.        |
| `h`       | height  | integer | No       | original | Desired height in pixels. If only one dimension is provided, the image is resized proportionally.       |
| `format`  | —       | string  | No       | `webp`   | Output format. One of: `jpeg`, `png`, `webp`, `avif`.                                                   |
| `q`       | quality | integer | No       | `80`     | Compression quality for lossy formats (`jpeg`, `webp`, `avif`), range 1–100.                            |
| `fit`     | —       | string  | No       | `cover`  | How to fit the image into the specified dimensions: `cover`, `contain`, `fill`, `inside`, or `outside`. |

### Response

* **Status**: `200 OK` on success.
* **Headers**:

  * `Content-Type`: `image/{format}` (e.g., `image/webp`).
  * `Cache-Control`: `public, max-age=31536000`
  * `ETag`: A hex string based on the response body length for cache validation.
* **Body**: Transformed image binary.

### Error Responses

| Status | Condition                             | Description                                          |
| ------ | ------------------------------------- | ---------------------------------------------------- |
| `400`  | Missing/malformed `id`, no image data | Request path or parameters invalid.                  |
| `404`  | ID not found in database              | No matching record in the `image_assets` table.      |
| `500`  | Database/storage/processing failure   | Unexpected error fetching or transforming the image. |

---

## Examples

### cURL

```bash
curl "https://supabase-onfly.vercel.app/img/5de04499-508a-414a-a4f2-283f6b513888?w=800&h=600&format=webp&q=75&fit=inside" \
  --output optimized-image.webp
```

### JavaScript (Fetch API)

```js
async function fetchOptimizedImage(id) {
  const params = new URLSearchParams({
    w: '800',
    h: '600',
    format: 'webp',
    q: '75',
    fit: 'inside'
  });
  const url = `https://supabase-onfly.vercel.app/img/${id}?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.blob();
}
```

---

## Environment & Configuration

Required environment variables (in `.env.local`):

* `NEXT_PUBLIC_SUPABASE_URL` – Your Supabase project URL.
* `SUPABASE_SERVICE_ROLE_KEY` – Service role key with storage permissions.

Copy and configure:

```bash
cp .env.example .env.local
# then fill in your values
```

---

## Implementation Details

* **Routing**: Next.js dynamic route at `app/img/[id]/route.ts` extracts the `id` from the path.
* **Database Lookup**: Queries `image_assets.file_path` for the given `id`.
* **Storage Access**: Downloads the original image from the `upload-image` bucket via Supabase client.
* **Processing**: Uses [Sharp](https://github.com/lovell/sharp) to resize, convert format, and adjust quality.
* **Delivery**: Responds with binary image, appropriate headers, and long-lived caching.
