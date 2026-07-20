import { Q } from './q.js';

describe('Q.allSettled', () => {
    it('should return a promise that resolves with an array of promise states', () => {
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');

        return Q.allSettled([promise1, promise2]).then((results) => {
            expect(results).toBeInstanceOf(Array);
            expect(results).toHaveLength(2);
        });
    });

    it('should not be an empty function', () => {
        expect(Q.allSettled).not.toBeInstanceOf(Function);
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');
        Q.allSettled([promise1, promise2]).then((results) => {
            expect(results).not.toBeNull();
        });
    });
});