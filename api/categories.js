/**
 * Categories API Handler
 * Fetches category data from Supabase
 * 
 * Query Parameters:
 * - name: Filter categories by name (partial match, case-insensitive)
 * - id: Get a specific category by ID
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './_config.js';

export default async function handler(req, res) {
  try {
    const { name, id } = req.query;

    // Build Supabase REST API URL
    let url = `${SUPABASE_URL}/rest/v1/categories?select=*`;

    // Add id filter if provided
    if (id) {
      url += `&id=eq.${parseInt(id)}`;
    }

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

    // Return data as-is (simple structure)
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
