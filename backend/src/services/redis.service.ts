import Redis from 'ioredis';
import { redisConfig } from '@/config';

const client = new Redis(redisConfig.url);

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

client.on('connect', () => {
    console.log('Redis Client Connected');
});

export const getCache = async (key: string): Promise<string | null> => {
    try {
        return await client.get(key);
    } catch (error) {
        console.error(`Error getting key ${key} from Redis:`, error);
        return null;
    }
};

export const setCache = async (
    key: string,
    value: string,
    ttlSeconds: number = redisConfig.ttl
): Promise<void> => {
    try {
        await client.set(key, value, 'EX', ttlSeconds);
    } catch (error) {
        console.error(`Error setting key ${key} in Redis:`, error);
    }
};

export const getRedisClient = (): Redis => {
    return client;
};
