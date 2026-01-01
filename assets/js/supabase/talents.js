/**
 * Talents Data Store
 * Fetches and caches talent data from Supabase
 * Talents are special abilities and perks in the game
 */

import { getAll, query } from './client.js';
import { saveToCache, getFromCache, removeFromCache } from './cache.js';
import { STORAGE_KEYS } from './config.js';
import { getCategoriesMap } from './categories.js';

const CACHE_KEY = STORAGE_KEYS.TALENTS;

// Categories map will be loaded from the database
let categoriesMap = null;

/**
 * Ensures categories are loaded before transforming data
 */
async function ensureCategoriesLoaded() {
    if (!categoriesMap) {
        categoriesMap = await getCategoriesMap();
    }
}

/**
 * Gets category name from ID using the loaded categories map
 * @param {number} categoryId - The category ID
 * @returns {string} - The category name or 'Unknown'
 */
function getCategoryName(categoryId) {
    if (!categoriesMap) return 'Unknown';
    return categoriesMap[categoryId] || 'Unknown';
}

/**
 * Transforms Supabase talent data to match the expected format
 * Maintains compatibility with existing code that uses the old JSON structure
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
            desc: item.description || '',
            accurate_description: item.accurate_description || '',
            rarity: item.rarity || 'Common',
            category: getCategoryName(item.category),
            categoryId: item.category,
            reqs: transformRequirements(item.requirements),
            exclusiveWith: item.exclusive_with || [],
            stats: item.stats || '',
            flags: item.flags || {},
            fromTalent: item.from_talent || null,
            notes: item.notes || '',
            dontCountTowardsTotal: item.flags?.dontCountTowardsTotal || false
        };
    });
    
    return result;
}

/**
 * Transforms Supabase talent data to an array format
 * @param {Array} data - Raw data from Supabase
 * @returns {Array} - Array of transformed talent objects
 */
function transformDataToArray(data) {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        desc: item.description || '',
        accurate_description: item.accurate_description || '',
        rarity: item.rarity || 'Common',
        category: getCategoryName(item.category),
        categoryId: item.category,
        reqs: transformRequirements(item.requirements),
        exclusiveWith: item.exclusive_with || [],
        stats: item.stats || '',
        flags: item.flags || {},
        fromTalent: item.from_talent || null,
        notes: item.notes || '',
        dontCountTowardsTotal: item.flags?.dontCountTowardsTotal || false
    }));
}

/**
 * Transforms requirements from Supabase format to expected format
 * @param {Object} requirements - Raw requirements from Supabase
 * @returns {Object} - Transformed requirements
 */
function transformRequirements(requirements) {
    if (!requirements) {
        return {
            power: "0",
            weaponType: "None",
            from: "",
            base: {
                Strength: 0,
                Fortitude: 0,
                Agility: 0,
                Intelligence: 0,
                Willpower: 0,
                Charisma: 0
            },
            weapon: {
                "Heavy Wep.": 0,
                "Medium Wep.": 0,
                "Light Wep.": 0
            },
            attunement: {
                Flamecharm: 0,
                Frostdraw: 0,
                Thundercall: 0,
                Galebreathe: 0,
                Shadowcast: 0,
                Ironsing: 0,
                Bloodrend: 0
            }
        };
    }
    
    return requirements;
}

/**
 * Fetches talents data from Supabase
 * @param {boolean} forceRefresh - Force fetch from server ignoring cache
 * @param {string} format - Return format: 'object' (keyed by name) or 'array'
 * @returns {Promise<Object|Array>} - Talents data
 */
export async function fetchTalents(forceRefresh = false, format = 'object') {
    // Try to get from cache first
    if (!forceRefresh) {
        const cached = getFromCache(CACHE_KEY);
        if (cached) {
            console.log('[Talents] Using cached data');
            return format === 'array' ? Object.values(cached) : cached;
        }
    }

    console.log('[Talents] Fetching from Supabase...');
    try {
        // Ensure categories are loaded first
        await ensureCategoriesLoaded();

        const data = await getAll('talents', {
            order: 'name',
            ascending: true
        });

        const transformed = transformData(data);
        saveToCache(CACHE_KEY, transformed);
        console.log(`[Talents] Cached ${Object.keys(transformed).length} items`);
        return format === 'array' ? Object.values(transformed) : transformed;
    } catch (error) {
        console.error('[Talents] Fetch error:', error);
        
        // Return cached data if available, even if expired
        const cached = getFromCache(CACHE_KEY, false);
        if (cached) {
            console.log('[Talents] Returning stale cache due to fetch error');
            return format === 'array' ? Object.values(cached) : cached;
        }
        
        throw error;
    }
}

/**
 * Gets a single talent by name
 * @param {string} name - The talent name
 * @returns {Promise<Object|null>} - The talent or null
 */
export async function getTalentByName(name) {
    const talents = await fetchTalents();
    const key = name.toLowerCase();
    return talents[key] || null;
}

/**
 * Gets talents by category
 * @param {string} category - The talent category
 * @returns {Promise<Array>} - Array of matching talents
 */
export async function getTalentsByCategory(category) {
    const talents = await fetchTalents(false, 'array');
    return talents.filter(item => 
        item.category && item.category.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Gets talents by rarity
 * @param {string} rarity - The talent rarity (Common, Rare, Advanced, Legendary)
 * @returns {Promise<Array>} - Array of matching talents
 */
export async function getTalentsByRarity(rarity) {
    const talents = await fetchTalents(false, 'array');
    return talents.filter(item => 
        item.rarity && item.rarity.toLowerCase() === rarity.toLowerCase()
    );
}

/**
 * Searches talents by name (partial match)
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} - Array of matching talents
 */
export async function searchTalents(searchTerm) {
    const talents = await fetchTalents(false, 'array');
    const term = searchTerm.toLowerCase();
    return talents.filter(item => 
        item.name && item.name.toLowerCase().includes(term)
    );
}

/**
 * Clears the talents cache
 */
export function clearTalentsCache() {
    removeFromCache(CACHE_KEY);
}

/**
 * Gets all unique talent categories
 * @returns {Promise<Array<string>>} - Array of unique categories
 */
export async function getTalentCategories() {
    const talents = await fetchTalents(false, 'array');
    const categories = new Set(talents.map(item => item.category).filter(Boolean));
    return Array.from(categories).sort();
}

/**
 * Gets all unique talent rarities
 * @returns {Promise<Array<string>>} - Array of unique rarities
 */
export async function getTalentRarities() {
    const talents = await fetchTalents(false, 'array');
    const rarities = new Set(talents.map(item => item.rarity).filter(Boolean));
    return Array.from(rarities);
}

export default {
    fetchTalents,
    getTalentByName,
    getTalentsByCategory,
    getTalentsByRarity,
    searchTalents,
    clearTalentsCache,
    getTalentCategories,
    getTalentRarities
};
