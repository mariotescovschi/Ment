import AsyncStorage from "@react-native-async-storage/async-storage";


export const cacheObject = async (data: any, key: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.error("Error saving login state:", error);
        return null;
    }
};

export const cacheString = async (data: any, key: string) => {
    try {
        await AsyncStorage.setItem(key, data);
    }
    catch (error) {
        console.error("Error saving login state:", error);
        return null;
    }
};

export const getCachedObject = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        console.error("Error retrieving login state:", error);
        return null;
    }
};
export const getCachedString = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value)
            return value;
    }
    catch (error) {
        console.error("Error retrieving login state:", error);
        return null;
    }
};