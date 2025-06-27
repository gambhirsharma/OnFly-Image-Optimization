#!/bin/sh

# Load env values from .env
NEXT_PUBLIC_SUPABASE_URL=$(printenv NEXT_PUBLIC_SUPABASE_URL)

NEXT_PUBLIC_SUPABASE_ANON_KEY=$(printenv NEXT_PUBLIC_SUPABASE_ANON_KEY)


# Ensure required vars are loaded
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "Error: Required env vars not set."
  exit 1
fi

# Patterns
PLACEHOLDER="deja__gu__nod"
PLACEHOLDER_URL="https://${PLACEHOLDER}.co"

echo "Replacing $PLACEHOLDER_URL → $NEXT_PUBLIC_SUPABASE_URL"
echo "Replacing $PLACEHOLDER → $NEXT_PUBLIC_SUPABASE_ANON_KEY"

# Replace only in UTF-8-compatible text files (.js, .html, .json, .txt, etc.)
find .next \( -name '*.js' -o -name '*.html' -o -name '*.json' -o -name '*.txt' \) -type f -exec \
  sed -i '' \
  -e "s|$PLACEHOLDER_URL|$NEXT_PUBLIC_SUPABASE_URL|g" \
  -e "s|$PLACEHOLDER|$NEXT_PUBLIC_SUPABASE_ANON_KEY|g" {} +

echo "Reaplace complete. :)"

# ✅ Start the actual app
echo "✅ Launching: $@"
exec "$@"
