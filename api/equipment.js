/**
 * Equipment API Handler
 * Fetches equipment data from Supabase
 * 
 * Query Parameters:
 * - name: Filter equipment by name (partial match, case-insensitive)
 * - type: Filter by equipment type (Head, Torso, Arms, Legs, Face, Ears, Rings)
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './_config.js';

export default async function handler(req, res) {
  try {
    const { name, type } = req.query;

    // Build Supabase REST API URL
    let url = `${SUPABASE_URL}/rest/v1/equipment?select=*`;

    // Add name filter if provided (case-insensitive partial match)
    if (name) {
      const decodedName = decodeURIComponent(name);
      url += `&name=ilike.*${decodedName}*`;
    }

    // Add type filter if provided
    if (type) {
      url += `&type=ilike.${decodeURIComponent(type)}`;
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
    const transformedData = data.map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      stats: item.stats || {},
      talents: item.talents || {},
      rarities: item.rarities || {}
    }));

    res.status(200).json(transformedData);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
