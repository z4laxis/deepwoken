/**
 * Bell Data Store
 * Fetches and caches bell data from Supabase
 * Bells are special resonance abilities in the game
 */

import { getAll } from './client.js';
import { saveToCache, getFromCache, removeFromCache } from './cache.js';
import { STORAGE_KEYS } from './config.js';

const CACHE_KEY = STORAGE_KEYS.BELL;

/**
 * Transforms Supabase bell data to match the expected format
 * Maintains compatibility with existing code that uses the old JSON structure
 * @param {Array} data - Raw data from Supabase
 * @returns {Array} - Transformed data
 */
function transformData(data) {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        cardtype: 'bell', // For backwards compatibility
        class: item.class,
        desc: item.desc || '',
        // Icon mapping based on name/type (can be expanded)
        icon: getIconForBell(item.name)
    }));
}

/**
 * Determines the icon for a bell based on its name
 * @param {string} name - The bell name
 * @returns {string} - The icon identifier
 */
function getIconForBell(name) {
// in case the deepwoken devs want to expand this later
    return 'question'; // Default icon
}

/**
 * Fetches bell data from Supabase
 * @param {boolean} forceRefresh - Force fetch from server ignoring cache
 * @returns {Promise<Array>} - Array of bell items
 */
export async function fetchBells(forceRefresh = false) {
    // Try to get from cache first
    if (!forceRefresh) {
        const cached = getFromCache(CACHE_KEY);
        if (cached) {
            console.log('[Bell] Using cached data');
            return cached;
        }
    }

    console.log('[Bell] Fetching from Supabase...');
    try {
        const data = await getAll('bell', {
            order: 'name',
            ascending: true
        });

        const transformed = transformData(data);
        saveToCache(CACHE_KEY, transformed);
        console.log(`[Bell] Cached ${transformed.length} items`);
        return transformed;
    } catch (error) {
        console.error('[Bell] Fetch error:', error);
        
        // Return cached data if available, even if expired
        const cached = getFromCache(CACHE_KEY, false);
        if (cached) {
            console.log('[Bell] Returning stale cache due to fetch error');
            return cached;
        }
        
        throw error;
    }
}

/**
 * Gets a single bell by name
 * @param {string} name - The bell name
 * @returns {Promise<Object|null>} - The bell or null
 */
export async function getBellByName(name) {
    const bells = await fetchBells();
    return bells.find(item => 
        item.name.toLowerCase() === name.toLowerCase()
    ) || null;
}

/**
 * Searches bells by name (partial match)
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} - Array of matching bells
 */
export async function searchBells(searchTerm) {
    const bells = await fetchBells();
    const term = searchTerm.toLowerCase();
    return bells.filter(item => 
        item.name && item.name.toLowerCase().includes(term)
    );
}

/**
 * Clears the bell cache
 */
export function clearBellCache() {
    removeFromCache(CACHE_KEY);
}


export default {
    fetchBells,
    getBellByName,
    searchBells,
    clearBellCache,
};
