
import 'server-only';

import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient(accessToken?: string) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variable.',
    );
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    ...(accessToken
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
      : {}),
  });
}
