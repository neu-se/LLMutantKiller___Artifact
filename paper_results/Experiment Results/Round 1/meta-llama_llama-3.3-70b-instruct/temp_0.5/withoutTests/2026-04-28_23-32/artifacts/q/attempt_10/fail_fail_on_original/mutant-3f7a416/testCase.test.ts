import { Q } from './q.js';

describe('Q.allSettled', () => {
    it('should throw an error when allSettled is not implemented', () => {
        const originalAllSettled = Q.allSettled;
        Q.allSettled = () => {};
        expect(() => Q.allSettled([Q.resolve('resolved'), Q.reject('rejected')])).toThrowError();
        Q.allSettled = originalAllSettled;
    });

    it('should return a promise that resolves with an array of promise states', async () => {
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');

        const results = await Q.allSettled([promise1, promise2]);
        expect(results).toBeInstanceOf(Array);
        expect(results).toHaveLength(2);
        expect(results[0].state).toBe('fulfilled');
        expect(results[1].state).toBe('rejected');
    });
});