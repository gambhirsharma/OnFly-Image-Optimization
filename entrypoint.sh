#!/bin/sh
set -e

echo "🚀 Starting container with safe env replacement"
echo "🔍 Current NEXT_PUBLIC_ env vars:"
printenv | grep NEXT_PUBLIC_

# Replace all NEXT_PUBLIC_ variables in .next files
printenv | grep NEXT_PUBLIC_ | while read -r line; do
  key=$(echo "$line" | cut -d '=' -f1)
  value=$(echo "$line" | cut -d '=' -f2-)
  echo "🔁 Replacing $key in .next"
  find /app/.next -type f -exec sed -i "s|$key|$value|g" {} +
done

# Replace only full Supabase API URLs
SUPABASE_URL=$(printenv NEXT_PUBLIC_SUPABASE_URL)

if [ -n "$SUPABASE_URL" ]; then
  echo "🌐 Replacing 'https://example.co' → '$SUPABASE_URL'"
  # Only replace full URLs, not hostname fragments
  find /app/.next -type f -exec sed -i "s|https://example.co|$SUPABASE_URL|g" {} +
else
  echo "⚠️ NEXT_PUBLIC_SUPABASE_URL not set. Skipping URL replacement."
fi

# ✅ Start the actual app
echo "✅ Launching: $@"
exec "$@"
