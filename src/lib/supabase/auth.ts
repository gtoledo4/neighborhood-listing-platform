
import 'server-only';

import { createSupabaseServerClient } from '@/lib/server';

export async function getAuthenticatedUser(accessToken: string) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return null;
  }

  return user;
}
