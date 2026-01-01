/**
 * Equipment Data Store
 * Fetches and caches equipment data from Supabase
 * Equipment includes armor, accessories, and other wearable items
 */

import { getAll } from './client.js';
import { saveToCache, getFromCache, removeFromCache } from './cache.js';
import { STORAGE_KEYS } from './config.js';

const CACHE_KEY = STORAGE_KEYS.EQUIPMENT;

/**
 * Transforms Supabase equipment data to match the expected format
 * @param {Array} data - Raw data from Supabase
 * @returns {Array} - Transformed data
 */
function transformData(data) {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        stats: item.stats || {},
        talents: item.talents || {},
        rarities: item.rarities || {}
    }));
}

/**
 * Fetches equipment data from Supabase
 * @param {boolean} forceRefresh - Force fetch from server ignoring cache
 * @returns {Promise<Array>} - Array of equipment items
 */
export async function fetchEquipment(forceRefresh = false) {
    // Try to get from cache first
    if (!forceRefresh) {
        const cached = getFromCache(CACHE_KEY);
        if (cached) {
            console.log('[Equipment] Using cached data');
            return cached;
        }
    }

    console.log('[Equipment] Fetching from Supabase...');
    try {
        const data = await getAll('equipment', {
            order: 'name',
            ascending: true
        });

        const transformed = transformData(data);
        saveToCache(CACHE_KEY, transformed);
        console.log(`[Equipment] Cached ${transformed.length} items`);
        return transformed;
    } catch (error) {
        console.error('[Equipment] Fetch error:', error);
        
        // Return cached data if available, even if expired
        const cached = getFromCache(CACHE_KEY, false);
        if (cached) {
            console.log('[Equipment] Returning stale cache due to fetch error');
            return cached;
        }
        
        throw error;
    }
}

/**
 * Gets a single equipment item by name
 * @param {string} name - The equipment name
 * @returns {Promise<Object|null>} - The equipment item or null
 */
export async function getEquipmentByName(name) {
    const equipment = await fetchEquipment();
    return equipment.find(item => 
        item.name.toLowerCase() === name.toLowerCase()
    ) || null;
}

/**
 * Gets equipment items by type
 * @param {string} type - The equipment type (e.g., 'Head', 'Torso', etc.)
 * @returns {Promise<Array>} - Array of matching equipment items
 */
export async function getEquipmentByType(type) {
    const equipment = await fetchEquipment();
    return equipment.filter(item => 
        item.type && item.type.toLowerCase() === type.toLowerCase()
    );
}

/**
 * Searches equipment by name (partial match)
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} - Array of matching equipment items
 */
export async function searchEquipment(searchTerm) {
    const equipment = await fetchEquipment();
    const term = searchTerm.toLowerCase();
    return equipment.filter(item => 
        item.name && item.name.toLowerCase().includes(term)
    );
}

/**
 * Clears the equipment cache
 */
export function clearEquipmentCache() {
    removeFromCache(CACHE_KEY);
}

/**
 * Gets all unique equipment types
 * @returns {Promise<Array<string>>} - Array of unique types
 */
export async function getEquipmentTypes() {
    const equipment = await fetchEquipment();
    const types = new Set(equipment.map(item => item.type).filter(Boolean));
    return Array.from(types).sort();
}

export default {
    fetchEquipment,
    getEquipmentByName,
    getEquipmentByType,
    searchEquipment,
    clearEquipmentCache,
    getEquipmentTypes
};
