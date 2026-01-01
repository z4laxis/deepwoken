/**
 * Supabase Configuration
 * Contains the project URL and public anon key for client-side access
 */

export const SUPABASE_URL = 'https://idyjvmmldtdvpklkzrgr.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkeWp2bW1sZHRkdnBrbGt6cmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODg4NTgsImV4cCI6MjA2ODg2NDg1OH0.DB-6F-joVK-oaFCw9jBoiqXlPFAMzbzh4TLE2EdD_b0';

// Version control settings
export const VERSION_ROW_ID = '4c0570e1-fecc-4247-98e2-677f17f441cc';
export const VERSION_STORAGE_KEY = 'deepwoken_data_version';

// LocalStorage keys for cached data
export const STORAGE_KEYS = {
    EQUIPMENT: 'deepwoken_equipment',
    BELL: 'deepwoken_bell',
    TALENTS: 'deepwoken_talents',
    CATEGORIES: 'deepwoken_categories',
    MANTRAS: 'deepwoken_mantras',
    VERSION: 'deepwoken_data_version'
};

// Cache expiration time (24 hours in milliseconds) - fallback if version check fails
export const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
