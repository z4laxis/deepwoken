/**
 * Shared Supabase Configuration for API handlers
 * This file contains all the configuration constants used by serverless functions
 */

export const SUPABASE_URL = 'https://idyjvmmldtdvpklkzrgr.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkeWp2bW1sZHRkdnBrbGt6cmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODg4NTgsImV4cCI6MjA2ODg2NDg1OH0.DB-6F-joVK-oaFCw9jBoiqXlPFAMzbzh4TLE2EdD_b0';
export const VERSION_ROW_ID = '4c0570e1-fecc-4247-98e2-677f17f441cc';

/**
 * Helper function to make Supabase REST API requests
 * @param {string} endpoint - The REST API endpoint (e.g., 'bell', 'talents')
 * @param {Object} options - Query options
 * @returns {Promise<Response>} - Fetch response
 */
export async function supabaseFetch(endpoint, options = {}) {
    const { select = '*', filters = '', order = '' } = options;
    
    let url = `${SUPABASE_URL}/rest/v1/${endpoint}?select=${select}`;
    if (filters) url += `&${filters}`;
    if (order) url += `&order=${order}`;
    
    return fetch(url, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        }
    });
}
