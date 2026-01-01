/**
 * Data Version API Handler
 * Returns the current data version from Supabase
 * Used by clients to check if they need to refresh their cached data
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY, VERSION_ROW_ID } from './_config.js';

export default async function handler(req, res) {
  try {
    // Build Supabase REST API URL
    const url = `${SUPABASE_URL}/rest/v1/app_data_version?id=eq.${VERSION_ROW_ID}&select=version_key,last_updated`;

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

    if (data.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Version record not found"
      });
    }

    res.status(200).json({
      version: data[0].version_key,
      lastUpdated: data[0].last_updated
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
