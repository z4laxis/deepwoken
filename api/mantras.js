/**
 * Mantras API Handler
 * Fetches mantra data from Supabase
 * 
 * Query Parameters:
 * - name: Filter mantras by name (partial match, case-insensitive)
 * - category: Filter by category (Flamecharm, Frostdraw, etc.)
 * - type: Filter by mantra type (Combat, Mobility, etc.)
 * - stars: Filter by star rating (0-3)
 * - vaulted: Filter by vaulted status (true/false)
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './_config.js';

export default async function handler(req, res) {
  try {
    const { name, category, type, stars, vaulted } = req.query;

    // Build Supabase REST API URL
    let url = `${SUPABASE_URL}/rest/v1/mantras?select=*`;

    // Add name filter if provided (case-insensitive partial match)
    if (name) {
      const decodedName = decodeURIComponent(name);
      url += `&name=ilike.*${decodedName}*`;
    }

    // Add category filter if provided
    if (category) {
      url += `&category=ilike.${decodeURIComponent(category)}`;
    }

    // Add type filter if provided
    if (type) {
      url += `&mantra_type=ilike.${decodeURIComponent(type)}`;
    }

    // Add stars filter if provided
    if (stars !== undefined) {
      url += `&stars=eq.${parseInt(stars)}`;
    }

    // Add vaulted filter if provided
    if (vaulted !== undefined) {
      url += `&vaulted=eq.${vaulted === 'true'}`;
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

    // Transform data to match expected format
    const transformedData = data.map(mantra => ({
      id: mantra.id,
      name: mantra.name,
      description: mantra.description || '',
      stars: mantra.stars || 0,
      category: mantra.category || '',
      mantraType: mantra.mantra_type || '',
      attribute: mantra.attribute || [],
      gif: mantra.gif || null,
      vaulted: mantra.vaulted || false,
      reqs: mantra.reqs || {}
    }));

    res.status(200).json(transformedData);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
