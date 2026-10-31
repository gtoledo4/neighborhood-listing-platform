import 'server-only';

import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient(accessToken?: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error('Missing Supabase client configuration');
  }

  return createClient(supabaseUrl, anonKey, {
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
