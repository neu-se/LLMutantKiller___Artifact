import { Q } from './q';

describe('Q.allSettled', () => {
    it('should return a promise that resolves with an array of promise states', () => {
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');

        return Q.allSettled([promise1, promise2]).then((results) => {
            expect(results).toHaveLength(2);
            expect(results[0].state).toBe('fulfilled');
            expect(results[0].value).toBe('resolved');
            expect(results[1].state).toBe('rejected');
            expect(results[1].reason).toBe('rejected');
        });
    });
});