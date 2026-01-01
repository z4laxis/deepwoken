/**
 * Supabase Data Store - Main Entry Point
 * Coordinates data fetching, caching, and version management
 * 
 * Usage:
 *   import dataStore from '/assets/js/supabase/index.js';
 *   
 *   // Initialize and check for updates
 *   await dataStore.init();
 *   
 *   // Get data (automatically uses cache if available)
 *   const talents = await dataStore.getTalents();
 *   const equipment = await dataStore.getEquipment();
 *   const bells = await dataStore.getBells();
 *   const mantras = await dataStore.getMantras();
 *   const categories = await dataStore.getCategories();
 */

import { checkForUpdates, updateLocalVersion } from './version.js';
import { clearDataCache } from './cache.js';
import { fetchEquipment, getEquipmentByName, getEquipmentByType, searchEquipment } from './equipment.js';
import { fetchBells, getBellByName, searchBells } from './bell.js';
import { fetchTalents, getTalentByName, getTalentsByCategory, getTalentsByRarity, searchTalents } from './talents.js';
import { fetchCategories, getCategoryNameById, getCategoryByName, searchCategories } from './categories.js';
import { fetchMantras, getMantraByName, getMantrasByCategory, getMantrasByType, getMantrasByStars, searchMantras, getActiveMantras, getVaultedMantras } from './mantras.js';

// Track initialization state
let isInitialized = false;
let initPromise = null;

/**
 * Initializes the data store
 * Checks for version updates and refreshes data if needed
 * @param {boolean} forceRefresh - Force refresh all data regardless of version
 * @returns {Promise<Object>} - Initialization result with status and version info
 */
export async function init(forceRefresh = false) {
    // Prevent multiple simultaneous initializations
    if (initPromise) {
        return initPromise;
    }

    initPromise = (async () => {
        console.log('[DataStore] Initializing...');
        
        try {
            // Check for updates
            const versionCheck = await checkForUpdates();
            console.log('[DataStore] Version check:', versionCheck);

            const needsRefresh = forceRefresh || versionCheck.needsRefresh;

            if (needsRefresh) {
                console.log('[DataStore] Data needs refresh, clearing cache...');
                clearDataCache();
            }

            // Pre-fetch categories first (needed by talents)
            const categories = await fetchCategories(needsRefresh);

            // Pre-fetch all other data in parallel
            const [equipment, bells, talents, mantras] = await Promise.all([
                fetchEquipment(needsRefresh),
                fetchBells(needsRefresh),
                fetchTalents(needsRefresh),
                fetchMantras(needsRefresh)
            ]);

            // Update local version if we got a server version
            if (versionCheck.serverVersion) {
                updateLocalVersion(versionCheck.serverVersion);
            }

            isInitialized = true;

            return {
                success: true,
                refreshed: needsRefresh,
                version: versionCheck.serverVersion || versionCheck.localVersion,
                counts: {
                    equipment: equipment.length,
                    bells: bells.length,
                    talents: Object.keys(talents).length,
                    categories: categories.length,
                    mantras: Object.keys(mantras).length
                }
            };
        } catch (error) {
            console.error('[DataStore] Initialization error:', error);
            return {
                success: false,
                error: error.message
            };
        } finally {
            initPromise = null;
        }
    })();

    return initPromise;
}

/**
 * Ensures the data store is initialized before accessing data
 */
async function ensureInitialized() {
    if (!isInitialized) {
        await init();
    }
}

/**
 * Gets equipment data
 * @param {boolean} forceRefresh - Force fetch from server
 * @returns {Promise<Array>} - Equipment data
 */
export async function getEquipment(forceRefresh = false) {
    await ensureInitialized();
    return fetchEquipment(forceRefresh);
}

/**
 * Gets bell data
 * @param {boolean} forceRefresh - Force fetch from server
 * @returns {Promise<Array>} - Bell data
 */
export async function getBells(forceRefresh = false) {
    await ensureInitialized();
    return fetchBells(forceRefresh);
}

/**
 * Gets talent data
 * @param {boolean} forceRefresh - Force fetch from server
 * @param {string} format - 'object' or 'array'
 * @returns {Promise<Object|Array>} - Talent data
 */
export async function getTalents(forceRefresh = false, format = 'object') {
    await ensureInitialized();
    return fetchTalents(forceRefresh, format);
}

/**
 * Gets categories data
 * @param {boolean} forceRefresh - Force fetch from server
 * @returns {Promise<Array>} - Categories data
 */
export async function getCategories(forceRefresh = false) {
    await ensureInitialized();
    return fetchCategories(forceRefresh);
}

/**
 * Gets mantras data
 * @param {boolean} forceRefresh - Force fetch from server
 * @param {string} format - 'object' or 'array'
 * @returns {Promise<Object|Array>} - Mantras data
 */
export async function getMantras(forceRefresh = false, format = 'object') {
    await ensureInitialized();
    return fetchMantras(forceRefresh, format);
}

/**
 * Forces a refresh of all data
 * Useful when you know data has been updated
 * @returns {Promise<Object>} - Refresh result
 */
export async function forceRefreshAll() {
    isInitialized = false;
    return init(true);
}

/**
 * Gets the current initialization status
 * @returns {boolean} - Whether the store is initialized
 */
export function isReady() {
    return isInitialized;
}

// Export individual data accessors for convenience
export {
    // Equipment
    getEquipmentByName,
    getEquipmentByType,
    searchEquipment,
    
    // Bells
    getBellByName,
    searchBells,
    
    // Talents
    getTalentByName,
    getTalentsByCategory,
    getTalentsByRarity,
    searchTalents,

    // Categories
    getCategoryNameById,
    getCategoryByName,
    searchCategories,

    // Mantras
    getMantraByName,
    getMantrasByCategory,
    getMantrasByType,
    getMantrasByStars,
    searchMantras,
    getActiveMantras,
    getVaultedMantras
};

// Default export with all methods
export default {
    init,
    isReady,
    forceRefreshAll,
    
    // Data getters
    getEquipment,
    getBells,
    getTalents,
    getCategories,
    getMantras,
    
    // Equipment methods
    getEquipmentByName,
    getEquipmentByType,
    searchEquipment,
    
    // Bell methods
    getBellByName,
    searchBells,
    
    // Talent methods
    getTalentByName,
    getTalentsByCategory,
    getTalentsByRarity,
    searchTalents,

    // Category methods
    getCategoryNameById,
    getCategoryByName,
    searchCategories,

    // Mantra methods
    getMantraByName,
    getMantrasByCategory,
    getMantrasByType,
    getMantrasByStars,
    searchMantras,
    getActiveMantras,
    getVaultedMantras
};
