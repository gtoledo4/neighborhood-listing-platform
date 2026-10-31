import 'server-only';

import { createSupabaseServerClient } from '@/lib/server';

export function getSupabaseServerClient(accessToken?: string) {
  return createSupabaseServerClient(accessToken);
}
