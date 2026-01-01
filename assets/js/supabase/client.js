/**
 * Supabase Client
 * A lightweight client for making requests to Supabase REST API
 * without requiring the full Supabase JS SDK
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

/**
 * Makes a request to the Supabase REST API
 * @param {string} table - The table name to query
 * @param {Object} options - Query options
 * @param {string} options.select - Columns to select (default: '*')
 * @param {Array} options.filters - Array of filter objects {column, operator, value}
 * @param {string} options.order - Column to order by
 * @param {boolean} options.ascending - Order direction (default: true)
 * @param {number} options.limit - Maximum number of rows to return
 * @returns {Promise<Array>} - Array of records
 */
export async function query(table, options = {}) {
    const {
        select = '*',
        filters = [],
        order = null,
        ascending = true,
        limit = null
    } = options;

    // Build the URL with query parameters
    let url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}`;

    // Add filters
    filters.forEach(filter => {
        const { column, operator, value } = filter;
        url += `&${column}=${operator}.${encodeURIComponent(value)}`;
    });

    // Add ordering
    if (order) {
        url += `&order=${order}.${ascending ? 'asc' : 'desc'}`;
    }

    // Add limit
    if (limit) {
        url += `&limit=${limit}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Supabase query error: ${error.message || response.statusText}`);
    }

    return response.json();
}

/**
 * Gets a single record by ID
 * @param {string} table - The table name
 * @param {string} id - The record ID
 * @param {string} idColumn - The ID column name (default: 'id')
 * @returns {Promise<Object|null>} - The record or null if not found
 */
export async function getById(table, id, idColumn = 'id') {
    const results = await query(table, {
        filters: [{ column: idColumn, operator: 'eq', value: id }],
        limit: 1
    });
    return results.length > 0 ? results[0] : null;
}

/**
 * Gets all records from a table
 * @param {string} table - The table name
 * @param {Object} options - Additional query options
 * @returns {Promise<Array>} - Array of all records
 */
export async function getAll(table, options = {}) {
    return query(table, options);
}

/**
 * Search records by a text field
 * @param {string} table - The table name
 * @param {string} column - The column to search
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} - Array of matching records
 */
export async function search(table, column, searchTerm) {
    return query(table, {
        filters: [{ column, operator: 'ilike', value: `%${searchTerm}%` }]
    });
}

export default {
    query,
    getById,
    getAll,
    search
};
