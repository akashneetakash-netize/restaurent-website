import { Redis } from '@upstash/redis';

const hasUpstash =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes('your-database') &&
  !process.env.UPSTASH_REDIS_REST_TOKEN.includes('your_upstash');

// In-memory fallback for demo / hackathon when Redis is not configured
const memoryStore = new Map<string, { value: any; expiresAt?: number }>();

export const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : {
      async incr(key: string): Promise<number> {
        const item = memoryStore.get(key);
        const current = (item?.value || 0) + 1;
        memoryStore.set(key, { ...item, value: current });
        return current;
      },
      async expire(key: string, seconds: number): Promise<number> {
        const item = memoryStore.get(key);
        if (item) {
          memoryStore.set(key, { ...item, expiresAt: Date.now() + seconds * 1000 });
        }
        return 1;
      },
      async set(key: string, value: any, options?: { ex?: number }): Promise<'OK'> {
        const expiresAt = options?.ex ? Date.now() + options.ex * 1000 : undefined;
        memoryStore.set(key, { value, expiresAt });
        return 'OK';
      },
      async get(key: string): Promise<any> {
        const item = memoryStore.get(key);
        if (!item) return null;
        if (item.expiresAt && Date.now() > item.expiresAt) {
          memoryStore.delete(key);
          return null;
        }
        return item.value;
      },
      async del(key: string): Promise<number> {
        return memoryStore.delete(key) ? 1 : 0;
      },
    };
