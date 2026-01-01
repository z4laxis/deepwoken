/**
 * Version Manager
 * Handles checking for data updates by comparing version keys
 * Ensures data is only fetched when the server-side version has changed
 */

import { query } from './client.js';
import { VERSION_ROW_ID, STORAGE_KEYS } from './config.js';

/**
 * Gets the current version from Supabase
 * @returns {Promise<string|null>} - The current version key or null if error
 */
export async function getServerVersion() {
    try {
        const results = await query('app_data_version', {
            filters: [{ column: 'id', operator: 'eq', value: VERSION_ROW_ID }],
            select: 'version_key',
            limit: 1
        });

        if (results.length > 0) {
            return results[0].version_key;
        }
        return null;
    } catch (error) {
        console.error('Error fetching server version:', error);
        return null;
    }
}

/**
 * Gets the stored version from localStorage
 * @returns {string|null} - The stored version key or null if not found
 */
export function getLocalVersion() {
    try {
        return localStorage.getItem(STORAGE_KEYS.VERSION);
    } catch (error) {
        console.error('Error reading local version:', error);
        return null;
    }
}

/**
 * Saves the version to localStorage
 * @param {string} version - The version key to save
 */
export function saveLocalVersion(version) {
    try {
        localStorage.setItem(STORAGE_KEYS.VERSION, version);
    } catch (error) {
        console.error('Error saving local version:', error);
    }
}

/**
 * Checks if data needs to be refreshed based on version comparison
 * @returns {Promise<Object>} - Object with needsRefresh boolean and serverVersion string
 */
export async function checkForUpdates() {
    const localVersion = getLocalVersion();
    const serverVersion = await getServerVersion();

    // If we can't get server version, don't force refresh (use cached data if available)
    if (!serverVersion) {
        return {
            needsRefresh: !localVersion, // Only refresh if we have no local data
            serverVersion: null,
            localVersion
        };
    }

    // If no local version exists, we need to refresh
    if (!localVersion) {
        return {
            needsRefresh: true,
            serverVersion,
            localVersion: null
        };
    }

    // Compare versions - if different, we need to refresh
    const needsRefresh = localVersion !== serverVersion;

    return {
        needsRefresh,
        serverVersion,
        localVersion
    };
}

/**
 * Updates the local version after successful data refresh
 * @param {string} serverVersion - The server version to save
 */
export function updateLocalVersion(serverVersion) {
    if (serverVersion) {
        saveLocalVersion(serverVersion);
    }
}

export default {
    getServerVersion,
    getLocalVersion,
    saveLocalVersion,
    checkForUpdates,
    updateLocalVersion
};
