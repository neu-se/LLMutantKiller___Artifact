import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should resolve to the first promise that is resolved', () => {
        const promise1 = new Promise((resolve) => {
            setTimeout(() => {
                resolve('Promise 1');
            }, 100);
        });

        const promise2 = new Promise((resolve) => {
            setTimeout(() => {
                resolve('Promise 2');
            }, 50);
        });

        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('Promise 2');
        });
    });
});