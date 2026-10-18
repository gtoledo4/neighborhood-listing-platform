import { getAuthenticatedUser } from '@/lib/supabase/auth';
import { createSupabaseServerClient } from '@/lib/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('properties')
      .select(
        'id, property_id, address, city, state, zip_code, price, bedrooms, bathrooms, square_feet, amenities',
      )
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      // Keep database details in server logs, not in the API response.
      console.error('Failed to fetch listings:', error.message);

      return NextResponse.json(
        { error: 'Unable to load listings.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ listings: data });
  } catch (error) {
    console.error('Unexpected listings API error:', error);

    return NextResponse.json(
      { error: 'Unable to load listings.' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    const match = authorization?.match(/^Bearer\s+(\S+)$/i);
    const accessToken = match?.[1];

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Authentication required.' },
        { status: 401 },
      );
    }

    const user = await getAuthenticatedUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired access token.' },
        { status: 401 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Request body must be valid JSON.' },
        { status: 400 },
      );
    }

    if (
      typeof body !== 'object' ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: 'Request body must be a JSON object.' },
        { status: 400 },
      );
    }

    const input = body as Record<string, unknown>;
    const requiredStrings = [
      'property_id',
      'address',
      'city',
      'state',
      'zip_code',
    ];

    for (const field of requiredStrings) {
      if (
        typeof input[field] !== 'string' ||
        input[field].trim().length === 0
      ) {
        return NextResponse.json(
          { error: `${field} must be a non-empty string.` },
          { status: 400 },
        );
      }
    }

    if (!/^[A-Z]{2}$/.test(input.state as string)) {
      return NextResponse.json(
        { error: 'state must be a two-letter uppercase code.' },
        { status: 400 },
      );
    }

    if (!/^\d{5}$/.test(input.zip_code as string)) {
      return NextResponse.json(
        { error: 'zip_code must contain five digits.' },
        { status: 400 },
      );
    }

    const numericFields = [
      'price',
      'bedrooms',
      'bathrooms',
      'square_feet',
    ];

    for (const field of numericFields) {
      const value = input[field];

      if (
        typeof value !== 'number' ||
        !Number.isFinite(value) ||
        value < 0
      ) {
        return NextResponse.json(
          { error: `${field} must be a nonnegative number.` },
          { status: 400 },
        );
      }
    }

    if (
      !Number.isInteger(input.bedrooms) ||
      !Number.isInteger(input.square_feet)
    ) {
      return NextResponse.json(
        { error: 'bedrooms and square_feet must be whole numbers.' },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(input.amenities) ||
      !input.amenities.every(
        (item) => typeof item === 'string' && item.trim().length > 0,
      )
    ) {
      return NextResponse.json(
        { error: 'amenities must be an array of non-empty strings.' },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServerClient(accessToken);

    const { data, error } = await supabase
      .from('properties')
      .insert({
        property_id: (input.property_id as string).trim(),
        address: (input.address as string).trim(),
        city: (input.city as string).trim(),
        state: (input.state as string).trim(),
        zip_code: (input.zip_code as string).trim(),
        price: input.price as number,
        bedrooms: input.bedrooms as number,
        bathrooms: input.bathrooms as number,
        square_feet: input.square_feet as number,
        amenities: input.amenities as string[],
        owner_id: user.id,
        status: 'draft',
      })
      .select(
        'id, property_id, address, city, state, zip_code, price, bedrooms, bathrooms, square_feet, amenities, status',
      )
      .single();

    if (error) {
      console.error('Failed to create property:', error.message);

      return NextResponse.json(
        { error: 'Unable to create property. Check the submitted data and permissions.' },
        { status: 400 },
      );
    }

    return NextResponse.json({ listing: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected property creation error:', error);

    return NextResponse.json(
      { error: 'Unable to create property.' },
      { status: 500 },
    );
  }
}
