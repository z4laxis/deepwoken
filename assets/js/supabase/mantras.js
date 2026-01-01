/**
 * Mantras Data Store
 * Fetches and caches mantra data from Supabase
 * Mantras are special abilities/spells in the game
 */

import { getAll } from './client.js';
import { saveToCache, getFromCache, removeFromCache } from './cache.js';
import { STORAGE_KEYS } from './config.js';

const CACHE_KEY = STORAGE_KEYS.MANTRAS;

/**
 * Transforms Supabase mantra data to match the expected format
 * @param {Array} data - Raw data from Supabase
 * @returns {Object} - Transformed data as object keyed by lowercase name
 */
function transformData(data) {
    const result = {};

    data.forEach(item => {
        const key = (item.name || '').toLowerCase();
        result[key] = {
            id: item.id,
            name: item.name,
            description: item.description || '',
            stars: item.stars || 0,
            category: item.category || '',
            mantraType: item.mantra_type || '',
            attribute: item.attribute || [],
            gif: item.gif || null,
            vaulted: item.vaulted || false,
            reqs: item.reqs || {},
            updatedAt: item.updated_at
        };
    });

    return result;
}

/**
 * Transforms Supabase mantra data to an array format
 * @param {Array} data - Raw data from Supabase
 * @returns {Array} - Array of transformed mantra objects
 */
function transformDataToArray(data) {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        stars: item.stars || 0,
        category: item.category || '',
        mantraType: item.mantra_type || '',
        attribute: item.attribute || [],
        gif: item.gif || null,
        vaulted: item.vaulted || false,
        reqs: item.reqs || {},
        updatedAt: item.updated_at
    }));
}

/**
 * Fetches mantras data from Supabase
 * @param {boolean} forceRefresh - Force fetch from server ignoring cache
 * @param {string} format - Return format: 'object' (keyed by name) or 'array'
 * @returns {Promise<Object|Array>} - Mantras data
 */
export async function fetchMantras(forceRefresh = false, format = 'object') {
    // Try to get from cache first
    if (!forceRefresh) {
        const cached = getFromCache(CACHE_KEY);
        if (cached) {
            console.log('[Mantras] Using cached data');
            return format === 'array' ? Object.values(cached) : cached;
        }
    }

    console.log('[Mantras] Fetching from Supabase...');
    try {
        const data = await getAll('mantras', {
            order: 'name',
            ascending: true
        });

        const transformed = transformData(data);
        saveToCache(CACHE_KEY, transformed);
        console.log(`[Mantras] Cached ${Object.keys(transformed).length} items`);
        return format === 'array' ? Object.values(transformed) : transformed;
    } catch (error) {
        console.error('[Mantras] Fetch error:', error);

        // Return cached data if available, even if expired
        const cached = getFromCache(CACHE_KEY, false);
        if (cached) {
            console.log('[Mantras] Returning stale cache due to fetch error');
            return format === 'array' ? Object.values(cached) : cached;
        }

        throw error;
    }
}

/**
 * Gets a single mantra by name
 * @param {string} name - The mantra name
 * @returns {Promise<Object|null>} - The mantra or null
 */
export async function getMantraByName(name) {
    const mantras = await fetchMantras();
    const key = name.toLowerCase();
    return mantras[key] || null;
}

/**
 * Gets mantras by category (e.g., 'Flamecharm', 'Frostdraw', etc.)
 * @param {string} category - The mantra category
 * @returns {Promise<Array>} - Array of matching mantras
 */
export async function getMantrasByCategory(category) {
    const mantras = await fetchMantras(false, 'array');
    return mantras.filter(item =>
        item.category && item.category.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Gets mantras by type (e.g., 'Combat', 'Mobility', etc.)
 * @param {string} mantraType - The mantra type
 * @returns {Promise<Array>} - Array of matching mantras
 */
export async function getMantrasByType(mantraType) {
    const mantras = await fetchMantras(false, 'array');
    return mantras.filter(item =>
        item.mantraType && item.mantraType.toLowerCase() === mantraType.toLowerCase()
    );
}

/**
 * Gets mantras by star rating
 * @param {number} stars - The star rating (0-3)
 * @returns {Promise<Array>} - Array of matching mantras
 */
export async function getMantrasByStars(stars) {
    const mantras = await fetchMantras(false, 'array');
    return mantras.filter(item => item.stars === stars);
}

/**
 * Gets mantras by attribute (e.g., 'Flamecharm', 'Strength', etc.)
 * @param {string} attribute - The attribute name
 * @returns {Promise<Array>} - Array of matching mantras
 */
export async function getMantrasByAttribute(attribute) {
    const mantras = await fetchMantras(false, 'array');
    const attr = attribute.toLowerCase();
    return mantras.filter(item =>
        item.attribute && item.attribute.some(a => a.toLowerCase() === attr)
    );
}

/**
 * Gets only non-vaulted mantras
 * @returns {Promise<Array>} - Array of active mantras
 */
export async function getActiveMantras() {
    const mantras = await fetchMantras(false, 'array');
    return mantras.filter(item => !item.vaulted);
}

/**
 * Gets only vaulted mantras
 * @returns {Promise<Array>} - Array of vaulted mantras
 */
export async function getVaultedMantras() {
    const mantras = await fetchMantras(false, 'array');
    return mantras.filter(item => item.vaulted);
}

/**
 * Searches mantras by name (partial match)
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} - Array of matching mantras
 */
export async function searchMantras(searchTerm) {
    const mantras = await fetchMantras(false, 'array');
    const term = searchTerm.toLowerCase();
    return mantras.filter(item =>
        item.name && item.name.toLowerCase().includes(term)
    );
}

/**
 * Clears the mantras cache
 */
export function clearMantrasCache() {
    removeFromCache(CACHE_KEY);
}

/**
 * Gets all unique mantra categories
 * @returns {Promise<Array<string>>} - Array of unique categories
 */
export async function getMantraCategories() {
    const mantras = await fetchMantras(false, 'array');
    const categories = new Set(mantras.map(item => item.category).filter(Boolean));
    return Array.from(categories).sort();
}

/**
 * Gets all unique mantra types
 * @returns {Promise<Array<string>>} - Array of unique types
 */
export async function getMantraTypes() {
    const mantras = await fetchMantras(false, 'array');
    const types = new Set(mantras.map(item => item.mantraType).filter(Boolean));
    return Array.from(types).sort();
}

export default {
    fetchMantras,
    getMantraByName,
    getMantrasByCategory,
    getMantrasByType,
    getMantrasByStars,
    getMantrasByAttribute,
    getActiveMantras,
    getVaultedMantras,
    searchMantras,
    clearMantrasCache,
    getMantraCategories,
    getMantraTypes
};
