import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.allSettled', () => {
    it('should return a promise that resolves with an array of promise states', () => {
        const promise1 = Q.resolve('resolved');
        const promise2 = Q.reject('rejected');
        const promise3 = Q.defer().promise;

        return Q.allSettled([promise1, promise2, promise3]).then((results) => {
            expect(results).toHaveLength(3);
            expect(results[0].state).toBe('fulfilled');
            expect(results[1].state).toBe('rejected');
            expect(results[2].state).toBe('pending');
        });
    });
});