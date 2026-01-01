/**
 * Cache Manager
 * Handles localStorage caching for Supabase data
 * Provides methods to save, retrieve, and invalidate cached data
 */

import { STORAGE_KEYS, CACHE_EXPIRATION } from './config.js';

/**
 * Saves data to localStorage with timestamp
 * @param {string} key - The storage key
 * @param {any} data - The data to cache
 */
export function saveToCache(key, data) {
    try {
        const cacheEntry = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    } catch (error) {
        console.error(`Error saving to cache (${key}):`, error);
        // If storage is full, try to clear old data
        if (error.name === 'QuotaExceededError') {
            clearAllCache();
            try {
                localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
            } catch (retryError) {
                console.error('Failed to save even after clearing cache:', retryError);
            }
        }
    }
}

/**
 * Gets data from localStorage cache
 * @param {string} key - The storage key
 * @param {boolean} checkExpiration - Whether to check if cache has expired
 * @returns {any|null} - The cached data or null if not found/expired
 */
export function getFromCache(key, checkExpiration = false) {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const cacheEntry = JSON.parse(cached);

        // Check expiration if needed (fallback when version check fails)
        if (checkExpiration && cacheEntry.timestamp) {
            const age = Date.now() - cacheEntry.timestamp;
            if (age > CACHE_EXPIRATION) {
                removeFromCache(key);
                return null;
            }
        }

        return cacheEntry.data;
    } catch (error) {
        console.error(`Error reading from cache (${key}):`, error);
        return null;
    }
}

/**
 * Removes a specific item from cache
 * @param {string} key - The storage key to remove
 */
export function removeFromCache(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing from cache (${key}):`, error);
    }
}

/**
 * Clears all Deepwoken-related cached data
 */
export function clearAllCache() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
}

/**
 * Clears specific table caches but keeps version
 * Used when version changes and data needs refresh
 */
export function clearDataCache() {
    try {
        removeFromCache(STORAGE_KEYS.EQUIPMENT);
        removeFromCache(STORAGE_KEYS.BELL);
        removeFromCache(STORAGE_KEYS.TALENTS);
        removeFromCache(STORAGE_KEYS.CATEGORIES);
        removeFromCache(STORAGE_KEYS.MANTRAS);
    } catch (error) {
        console.error('Error clearing data cache:', error);
    }
}

/**
 * Gets the cache timestamp for a specific key
 * @param {string} key - The storage key
 * @returns {number|null} - The timestamp or null if not found
 */
export function getCacheTimestamp(key) {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const cacheEntry = JSON.parse(cached);
        return cacheEntry.timestamp || null;
    } catch (error) {
        return null;
    }
}

/**
 * Checks if a specific cache entry exists and has data
 * @param {string} key - The storage key
 * @returns {boolean} - True if cache exists and has data
 */
export function isCached(key) {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return false;

        const cacheEntry = JSON.parse(cached);
        return cacheEntry.data !== null && cacheEntry.data !== undefined;
    } catch (error) {
        return false;
    }
}

export default {
    saveToCache,
    getFromCache,
    removeFromCache,
    clearAllCache,
    clearDataCache,
    getCacheTimestamp,
    isCached
};
