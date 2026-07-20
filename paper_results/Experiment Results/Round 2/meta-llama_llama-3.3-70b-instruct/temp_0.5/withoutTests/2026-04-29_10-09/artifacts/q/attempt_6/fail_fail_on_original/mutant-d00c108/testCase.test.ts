import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should resolve with the first promise that is resolved', () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.defer().promise;

        const result = Q.race([promise1, promise2]);

        promise1.resolve('Promise 1');

        return result.then((value) => {
            expect(value).toBe('Promise 1');
        });
    });
});