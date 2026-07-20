import { Q } from './q.js';

describe('Q.allSettled', () => {
    it('should return a promise that resolves with an array of promise states', () => {
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');

        return Q.allSettled([promise1, promise2]).then((results: any[]) => {
            expect(results).toBeInstanceOf(Array);
            expect(results).toHaveLength(2);
        });
    });

    it('should throw an error when allSettled is not implemented', () => {
        const originalAllSettled = Q.allSettled;
        Q.allSettled = () => {};
        expect(() => Q.allSettled([Q.resolve('resolved'), Q.reject('rejected')])).toThrowError();
        Q.allSettled = originalAllSettled;
    });
});