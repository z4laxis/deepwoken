/**
 * Talents API Handler
 * Fetches talent data from Supabase
 * 
 * Query Parameters:
 * - name: Filter talents by name (partial match, case-insensitive)
 * - category: Filter by category name
 * - rarity: Filter by rarity (Common, Rare, Advanced, Legendary)
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './_config.js';

export default async function handler(req, res) {
  try {
    const { name, category, rarity } = req.query;

    // Build Supabase REST API URL
    let url = `${SUPABASE_URL}/rest/v1/talents?select=*`;

    // Add name filter if provided (case-insensitive partial match)
    if (name) {
      const decodedName = decodeURIComponent(name);
      url += `&name=ilike.*${decodedName}*`;
    }

    // Add rarity filter if provided
    if (rarity) {
      url += `&rarity=ilike.${decodeURIComponent(rarity)}`;
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
    const transformedData = data.map(talent => ({
      id: talent.id,
      name: talent.name,
      desc: talent.description || '',
      accurate_description: talent.accurate_description || '',
      rarity: talent.rarity || 'Common',
      category: talent.category,
      reqs: talent.requirements || {},
      exclusiveWith: talent.exclusive_with || [],
      stats: talent.stats || '',
      flags: talent.flags || {},
      fromTalent: talent.from_talent || null,
      notes: talent.notes || ''
    }));

    res.status(200).json(transformedData);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
