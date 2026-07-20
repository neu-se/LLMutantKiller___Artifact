import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race function', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = new Promise((resolve) => {
            setTimeout(() => resolve('Promise 1'), 100);
        });
        const promise2 = new Promise((resolve) => {
            setTimeout(() => resolve('Promise 2'), 50);
        });

        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('Promise 2');
        });
    });
});