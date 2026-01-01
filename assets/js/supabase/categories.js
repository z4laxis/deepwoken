/**
 * Categories Data Store
 * Fetches and caches category data from Supabase
 * Categories are used to classify talents and other items
 */

import { getAll } from './client.js';
import { saveToCache, getFromCache, removeFromCache } from './cache.js';
import { STORAGE_KEYS } from './config.js';

const CACHE_KEY = STORAGE_KEYS.CATEGORIES;

// In-memory cache for quick lookups (id -> name mapping)
let categoriesMap = null;

/**
 * Transforms Supabase categories data
 * @param {Array} data - Raw data from Supabase
 * @returns {Object} - Object with both array and map formats
 */
function transformData(data) {
    const array = data.map(item => ({
        id: item.id,
        name: item.name
    }));

    // Create id -> name mapping for quick lookups
    const map = {};
    data.forEach(item => {
        map[item.id] = item.name;
    });

    return { array, map };
}

/**
 * Fetches categories data from Supabase
 * @param {boolean} forceRefresh - Force fetch from server ignoring cache
 * @returns {Promise<Array>} - Array of category objects
 */
export async function fetchCategories(forceRefresh = false) {
    // Try to get from cache first
    if (!forceRefresh) {
        const cached = getFromCache(CACHE_KEY);
        if (cached) {
            console.log('[Categories] Using cached data');
            categoriesMap = cached.map;
            return cached.array;
        }
    }

    console.log('[Categories] Fetching from Supabase...');
    try {
        const data = await getAll('categories', {
            order: 'name',
            ascending: true
        });

        const transformed = transformData(data);
        saveToCache(CACHE_KEY, transformed);
        categoriesMap = transformed.map;
        console.log(`[Categories] Cached ${transformed.array.length} items`);
        return transformed.array;
    } catch (error) {
        console.error('[Categories] Fetch error:', error);

        // Return cached data if available, even if expired
        const cached = getFromCache(CACHE_KEY, false);
        if (cached) {
            console.log('[Categories] Returning stale cache due to fetch error');
            categoriesMap = cached.map;
            return cached.array;
        }

        throw error;
    }
}

/**
 * Gets a category name by its ID
 * @param {number} categoryId - The category ID
 * @returns {Promise<string>} - The category name or 'Unknown'
 */
export async function getCategoryNameById(categoryId) {
    // If we don't have the map in memory, fetch categories first
    if (!categoriesMap) {
        await fetchCategories();
    }

    return categoriesMap[categoryId] || 'Unknown';
}

/**
 * Gets the categories map (id -> name)
 * @returns {Promise<Object>} - The categories map
 */
export async function getCategoriesMap() {
    if (!categoriesMap) {
        await fetchCategories();
    }
    return categoriesMap;
}

/**
 * Gets a category by name
 * @param {string} name - The category name
 * @returns {Promise<Object|null>} - The category or null
 */
export async function getCategoryByName(name) {
    const categories = await fetchCategories();
    return categories.find(cat =>
        cat.name.toLowerCase() === name.toLowerCase()
    ) || null;
}

/**
 * Searches categories by name (partial match)
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} - Array of matching categories
 */
export async function searchCategories(searchTerm) {
    const categories = await fetchCategories();
    const term = searchTerm.toLowerCase();
    return categories.filter(cat =>
        cat.name && cat.name.toLowerCase().includes(term)
    );
}

/**
 * Clears the categories cache
 */
export function clearCategoriesCache() {
    removeFromCache(CACHE_KEY);
    categoriesMap = null;
}

export default {
    fetchCategories,
    getCategoryNameById,
    getCategoriesMap,
    getCategoryByName,
    searchCategories,
    clearCategoriesCache
};
