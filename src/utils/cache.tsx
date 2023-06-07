const cacheAvailable = 'caches' in self;

const MEMBER_KEY = "member"

export const getCacheForMember = async () => {
    const cache: Cache = await caches.open('member');
    return cache;
}

export const addMember = async (cache: Cache, data:any) => {
    await cache.put(MEMBER_KEY, data);
}

export const addMember = async (cache: Cache, data:any) => {
    await cache.put(MEMBER_KEY, data);
}
    


