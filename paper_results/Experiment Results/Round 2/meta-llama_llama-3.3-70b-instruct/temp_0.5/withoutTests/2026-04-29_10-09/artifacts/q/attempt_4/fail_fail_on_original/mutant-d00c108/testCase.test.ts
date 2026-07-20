import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should resolve to the first promise that is resolved', () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.defer().promise;

        Q.race([promise1, promise2]).then((result: any) => {
            expect(result).toBeUndefined();
        });

        promise1.resolve('Promise 1');
    });
});