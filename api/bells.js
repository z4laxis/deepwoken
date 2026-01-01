/**
 * Bells API Handler
 * Fetches bell data from Supabase
 * 
 * Query Parameters:
 * - name: Filter bells by name (partial match, case-insensitive)
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './_config.js';

export default async function handler(req, res) {
  try {
    const { name } = req.query;

    // Build Supabase REST API URL
    let url = `${SUPABASE_URL}/rest/v1/bell?select=*`;

    // Add name filter if provided (case-insensitive partial match)
    if (name) {
      const decodedName = decodeURIComponent(name);
      url += `&name=ilike.*${decodedName}*`;
    }

    // Add ascending ordering
    url += `&order=name.asc`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch from Supabase');
    }

    const data = await response.json();

    // Transform data to match expected format (backwards compatibility)
    const transformedData = data.map(bell => ({
      name: bell.name,
      class: bell.class,
      desc: bell.desc || '',
      cardtype: 'bell' // For backwards compatibility
    }));

    res.status(200).json(transformedData);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
