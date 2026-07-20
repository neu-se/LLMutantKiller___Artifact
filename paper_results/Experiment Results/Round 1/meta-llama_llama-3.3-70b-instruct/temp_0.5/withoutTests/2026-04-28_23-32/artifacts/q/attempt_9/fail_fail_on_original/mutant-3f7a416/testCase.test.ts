import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q.allSettled', () => {
    it('should return a promise that resolves with an array of promise states', () => {
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');

        return Q.allSettled([promise1, promise2]).then((results: any[]) => {
            expect(results).toBeInstanceOf(Array);
            expect(results).toHaveLength(2);
            expect(results[0].state).toBe('fulfilled');
            expect(results[1].state).toBe('rejected');
        });
    });
});