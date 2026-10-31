import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { propertySchema } from '@/schemas/property';

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('properties')
      .select("id, address, price, bedrooms, bathrooms, square_feet")
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Unable to retrieve properties' },
        { status: 500 }
      );
    }

    return NextResponse.json({ properties: data });
  } catch {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const accessToken = authorization.slice(7).trim();

  try {
    const supabase = getSupabaseServerClient(accessToken);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();
    const parsed = propertySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid property data',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...parsed.data,
        owner_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Unable to create property' },
        { status: 403 }
      );
    }

    return NextResponse.json({ property: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
