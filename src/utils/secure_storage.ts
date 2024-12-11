import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

/**
 * Save a key-value pair to secure storage.
 * @param key The key to store the value under.
 * @param value The value to store.
 */
export const saveItem = async (key: string, value: string): Promise<void> => {
    try {
        if (isWeb) {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
        console.log(`Saved key "${key}" with value "${value}"`);
    } catch (error) {
        console.error(`Error saving key "${key}":`, error);
        throw new Error('Failed to save data.');
    }
};

/**
 * Retrieve a value from secure storage by its key.
 * @param key The key of the value to retrieve.
 * @returns The retrieved value, or null if it does not exist.
 */


/**
 * Retrieve a value from secure storage by its key.
 * @param key The key of the value to retrieve.
 * @returns The retrieved value, or null if it does not exist.
 */
export const getItem = async (key: string): Promise<string | null> => {
    try {
        if (isWeb) {
            return localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key); // Ensure this is async
        }
    } catch (error) {
        console.error(`Error retrieving key "${key}":`, error);
        return null;
    }
};


/**
 * Delete a key-value pair from secure storage.
 * @param key The key of the value to delete.
 */
export const deleteItem = async (key: string): Promise<void> => {
    try {
        if (isWeb) {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
        console.log(`Deleted key "${key}"`);
    } catch (error) {
        console.error(`Error deleting key "${key}":`, error);
        throw new Error('Failed to delete data.');
    }
};
